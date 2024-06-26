import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { youtube_v3 } from 'googleapis';

import { ChannelRepository } from 'src/db/repositories/channel.repository';
import { CommentRepository } from 'src/db/repositories/comment.repository';
import { VideoRepository } from 'src/db/repositories/video.repository';
import { ChannelEntity } from 'src/db/entities/channel.entity';
import { VideoEntity } from 'src/db/entities/video.entity';
import { CommentEntity } from 'src/db/entities/comment.entity';
import { AudioTranscriptionService } from '../audio-transcription/audio-transcription.service';
import { YoutubeChannel } from './interfaces';
import { AlertStatusEnum, AlertingService } from '../alerting/alerting.service';

/*
    Example of usage

    await app.get(DataExtractionService).saveYoutubeDataToDBByDateRange(
        new Date('2024-03-21T10:00:26.000Z'),
        new Date(Date.now())
    ).then(console.log)
*/
@Injectable()
export class DataExtractionService {
  private youtubeApi: youtube_v3.Youtube;
  private readonly channelsList: YoutubeChannel[];

  constructor(
    private readonly configService: ConfigService,
    private readonly commentRepository: CommentRepository,
    private readonly channelRepository: ChannelRepository,
    private readonly videoRepository: VideoRepository,
    private readonly audioTranscriptionService: AudioTranscriptionService,
    private readonly alertingService: AlertingService,
  ) {
    this.youtubeApi = new youtube_v3.Youtube({
      auth: this.configService.get<string>('youtube.apiKey'),
    });
    this.channelsList = this.configService.get<YoutubeChannel[]>(
      'youtube.channelsList',
    );
  }

  public async backFillYoutubeData(
    dateFrom: string,
    dateTo: string,
    channelId: string,
  ): Promise<void> {
    await this.saveYoutubeDataToDBByDateRange(
      new Date(dateFrom),
      new Date(dateTo),
      [channelId],
    );
  }

  async saveYoutubeDataToDBByDateRange(
    startDate: Date,
    endDate: Date,
    channelIds?: string[],
  ) {
    const { data } = await this.youtubeApi.channels.list({
      part: ['statistics', 'snippet'],
      id: this.channelsList
        .map(({ id }) => id)
        .filter((id) => (channelIds ? channelIds.includes(id) : true)),
    });
    let commentCount = 0;
    let videoCount = 0;
    for (const channel of data.items) {
      await this.saveYoutubeDataForOneChannel(channel);
      const videos = await this.saveVideosByChannel(
        channel.id,
        channel.snippet.country,
        startDate,
        endDate,
      );
      videoCount += videos.length;
      for (const video of videos) {
        commentCount += await this.saveCommentsByVideos(video.id);
      }
    }

    this.alertingService.alert(
      `commentCount: ${commentCount} videoCount: ${videoCount}`,
      AlertStatusEnum.info,
    );
  }

  private async saveYoutubeDataForOneChannel(
    channel: youtube_v3.Schema$Channel,
  ) {
    const channelEntity = new ChannelEntity();
    channelEntity.viewCount = channel.statistics.viewCount;
    channelEntity.videoCount = +channel.statistics.videoCount;
    channelEntity.title = channel.snippet.title;
    channelEntity.publishedAt = new Date(channel.snippet.publishedAt);
    channelEntity.defaultLanguage =
      channel.snippet.country ||
      this.configService
        .get<YoutubeChannel[]>('youtube.channelsList')
        .find(({ id }) => id == channel.id).defaultLanguage;
    channelEntity.descriptionChannel = channel.snippet.description;
    channelEntity.customUrl = channel.snippet.customUrl;
    channelEntity.country =
      channel.snippet.country ||
      this.configService
        .get<YoutubeChannel[]>('youtube.channelsList')
        .find(({ id }) => id == channel.id).defaultLanguage;
    channelEntity.subscriberCount = +channel.statistics.subscriberCount;
    channelEntity.id = channel.id;
    this.channelRepository.save(channelEntity);
  }

  private async saveYoutubeDataForVideos(videos: youtube_v3.Schema$Video[]) {
    const entities = videos.map(async (video) => {
      const videoEntity = new VideoEntity();
      videoEntity.id = video.id;
      videoEntity.channelId = video.snippet.channelId;
      videoEntity.commentCount = +video.statistics.commentCount;
      videoEntity.defaultAudioLanguage = video.snippet.defaultAudioLanguage;
      videoEntity.descriptionVideo = video.snippet.description;
      videoEntity.dislikeCount = +(video.statistics.dislikeCount || 0);
      videoEntity.likeCount = +video.statistics.likeCount;
      videoEntity.favoriteCount = +video.statistics.favoriteCount;
      videoEntity.publishedAt = new Date(video.snippet.publishedAt);
      videoEntity.recordingDate = new Date(
        video?.recordingDetails?.recordingDate || 0,
      );
      videoEntity.speechText = '';
      videoEntity.title = video.snippet.title;
      videoEntity.viewCount = video.statistics.viewCount;
      return videoEntity;
    });

    return this.videoRepository.save(await Promise.all(entities));
  }

  private async saveYoutubeDataForComments(
    comments: youtube_v3.Schema$Comment[],
  ) {
    const entities = comments.map((comment) => {
      const commentEntity = new CommentEntity();
      commentEntity.likeCount = comment.snippet.likeCount;
      commentEntity.id = comment.id;
      commentEntity.parentId = (comment as any).parentId;
      commentEntity.publishedAt = new Date(comment.snippet.publishedAt);
      commentEntity.textDisplay = comment.snippet.textDisplay;
      commentEntity.updatedAt = new Date(comment.snippet.updatedAt);
      commentEntity.videoId = comment.snippet.videoId;
      return commentEntity;
    });
    return this.commentRepository.save(entities);
  }

  private async saveVideosByChannel(
    channelId: string,
    channelLanguage: string,
    startDate: Date,
    endDate: Date,
  ) {
    const videos: Promise<youtube_v3.Schema$Video[]>[] = [];
    let pageToken;
    const videoCount = 0;
    do {
      const [videosData, newPageToken] = await this.getVideosByPage(
        channelId,
        startDate,
        endDate,
        pageToken,
      );
      pageToken = newPageToken;
      videos.push(
        videosData.then(async (videoData) => {
          await this.saveYoutubeDataForVideos(videoData);
          videoData.forEach((video) => {
            this.transcribeVideo(
              video.id,
              video.snippet.defaultAudioLanguage ||
                video.snippet.defaultLanguage ||
                channelLanguage ||
                this.configService
                  .get<YoutubeChannel[]>('youtube.channelsList')
                  .find(({ id }) => id == channelId).defaultLanguage,
            );
          });

          return videoData;
        }),
      );
    } while (pageToken);

    return (await Promise.all(videos)).flatMap((arr) => arr);
  }

  private async saveCommentsByVideos(videoId: string) {
    let pageToken;
    let commentCount = 0;
    do {
      try {
        const [videosData, newPageToken] = await this.getCommentsByPage(
          videoId,
          pageToken,
        );
        pageToken = newPageToken;
        this.saveYoutubeDataForComments(videosData);
        commentCount += videosData.length;
      } catch (e) {
        pageToken = null;
      }
    } while (pageToken);
    return commentCount;
  }

  private async getCommentsByPage(videoId: string, pageToken?: string) {
    const { data } = await this.youtubeApi.commentThreads.list({
      part: ['replies', 'snippet'],
      videoId,
      maxResults: 100,
      pageToken,
    });

    return [
      data.items.flatMap((thread) => {
        return [
          thread.snippet.topLevelComment,
          ...(thread?.replies?.comments?.map((comment) => ({
            ...comment,
            parentId: thread.snippet.topLevelComment.id,
          })) || []),
        ];
      }, data.nextPageToken),
    ];
  }

  private async transcribeVideo(videoId: string, language: string) {
    try {
      const text = await this.audioTranscriptionService.transcribeAudioByUrl(
        `https://www.youtube.com/watch?v=${videoId}`,
        language == 'US' ? 'en-US' : language == 'GB' ? 'en-GB' : language,
      );
      const video = new VideoEntity();
      video.id = videoId;
      video.speechText = text;
      this.videoRepository.save(video);
    } catch (e) {
      this.alertingService.alert(
        `transcription Error for Video ${videoId}`,
        AlertStatusEnum.error,
      );
      console.log(e, language);
    }
  }

  private async getVideosByPage(
    channelId: string,
    startDate: Date,
    endDate: Date,
    pageToken?: string,
  ): Promise<[Promise<youtube_v3.Schema$Video[]>, string]> {
    const { data } = await this.youtubeApi.search.list({
      part: ['snippet'],
      channelId,
      publishedBefore: endDate.toISOString(),
      publishedAfter: startDate.toISOString(),
      maxResults: 50,
    });

    const videoIds = data.items.map(({ id }) => `${id.videoId}`);
    if (videoIds.length == 0) return [Promise.resolve([]), null];
    const videosData = this.youtubeApi.videos.list({
      id: videoIds,
      maxResults: 50,
      pageToken,
      part: ['statistics', 'snippet'],
    });

    return [videosData.then(({ data }) => data.items), data.nextPageToken];
  }
}
