import { Injectable } from "@nestjs/common";
import { ChannelRepository } from "src/db/repositories/channel.repository";
import { CommentRepository } from "src/db/repositories/comment.repository";
import { VideoRepository } from "src/db/repositories/video.repository";
import { HttpService } from "@nestjs/axios";
import { youtubeConfig } from "src/configs/youtube.config";
import { youtube_v3 } from 'googleapis';
import { ChannelEntity } from "src/db/entities/channel.entity";
import { VideoEntity } from "src/db/entities/video.entity";
import { CommentEntity } from "src/db/entities/comment.entity";

@Injectable()
export class DataExtractionService {
    private youtubeApi: youtube_v3.Youtube;
    constructor(
        private readonly commentRepository: CommentRepository,
        private readonly channelRepository: ChannelRepository,
        private readonly videoRepository:   VideoRepository,
    ) {
        this.youtubeApi = new youtube_v3.Youtube({
            auth: youtubeConfig.youtubeApiKey
        });
        channelRepository.count().then(console.log)
    }

    async saveYoutubeDataToDBByDateRange(startDate: Date, endDate: Date) {
        const { data } = await this.youtubeApi.channels.list({
            part: ['statistics', 'snippet'],
            id: youtubeConfig.channelsList.map(({id})=>id),
        });
        for(let channel of data.items) {
            await this.saveYoutubeDataForOneChannel(channel);
            const videos = await this.saveVideosByChannel(channel.id, startDate, endDate);
            for(const video of videos) {
                await this.saveCommentsByVideos(video.id);
            }
        }
        
    }

    async saveYoutubeDataForOneChannel(channel: youtube_v3.Schema$Channel) {
        
        
        const channelEntity = new ChannelEntity();
        channelEntity.viewCount = channel.statistics.viewCount;
        channelEntity.videoCount = +channel.statistics.videoCount;
        channelEntity.title = channel.snippet.title;
        channelEntity.publishedAt = new Date(channel.snippet.publishedAt);
        channelEntity.defaultLanguage = channel.snippet.country;
        channelEntity.descriptionChannel = channel.snippet.description;
        channelEntity.customUrl = channel.snippet.customUrl;
        channelEntity.subscriberCount = +channel.statistics.subscriberCount;
        channelEntity.id = channel.id;
        return console.log(channelEntity);
        this.channelRepository.save(channelEntity);

    }
    async saveYoutubeDataForVideos(videos: youtube_v3.Schema$Video[]) {
        const entities = videos.map((video)=>{
            const videoEntity = new VideoEntity();
            videoEntity.id = video.id;
            videoEntity.channelId = video.snippet.channelId;
            videoEntity.commentCount = +video.statistics.commentCount;
            videoEntity.defaultAudioLanguage = video.snippet.defaultAudioLanguage;
            videoEntity.descriptionVideo = video.snippet.description;
            videoEntity.dislikeCount = +video.statistics.dislikeCount;
            videoEntity.likeCount = +video.statistics.likeCount;
            videoEntity.favoriteCount = +video.statistics.favoriteCount;
            videoEntity.publishedAt = new Date(video.snippet.publishedAt);
            videoEntity.recordingDate = new Date(video?.recordingDetails?.recordingDate || 0);
            videoEntity.speechText = "";
            videoEntity.title = video.snippet.title;
            videoEntity.viewCount = video.statistics.viewCount;
            return videoEntity;
        });
        return console.log(entities);
        return this.channelRepository.save(entities);

    }
    async saveYoutubeDataForComments(comments: youtube_v3.Schema$Comment[]) {
        const entities = comments.map((comment)=>{
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
        return console.log(entities);
        return this.channelRepository.save(entities);
    }

    async saveVideosByChannel(channelId: string, startDate: Date, endDate: Date) {
        const videos: Promise<youtube_v3.Schema$Video[]>[] = []
        let pageToken;
        do {
            const [videosData, newPageToken] = await this.getVideosByPage(channelId, startDate, endDate, pageToken);
            pageToken = newPageToken;
            videos.push(videosData.then((videoData)=>{
                this.saveYoutubeDataForVideos(videoData)
                return videoData;
            }));
            
        } while(pageToken);

        return (await Promise.all(videos)).flatMap(arr=>arr);
    }

    async saveCommentsByVideos(videoId: string) {
        let pageToken;
        do {
            const [videosData, newPageToken] = await this.getCommentsByPage(videoId, pageToken);
            pageToken = newPageToken;
            this.saveYoutubeDataForComments(videosData);
        } while(pageToken);
    }

    async getCommentsByPage(videoId: string, pageToken?: string) {
        const { data } = await this.youtubeApi.commentThreads.list({
            part: ['replies', 'snippet'],
            videoId,
            maxResults: 100,
            pageToken,
        });

        return [data.items.flatMap((thread)=>{
            return [thread.snippet.topLevelComment, ...(thread?.replies?.comments?.map((comment)=>({...comment, parentId: thread.snippet.topLevelComment.id})) || [])];
        }, data.nextPageToken)]


    }


    async getVideosByPage(channelId: string, startDate: Date, endDate: Date, pageToken?: string): Promise<[
        Promise<youtube_v3.Schema$Video[]>, 
        string
    ]> {
        const { data } = await this.youtubeApi.search.list({
            part: ["snippet"],
            channelId,
            publishedBefore: endDate.toISOString(),
            publishedAfter: startDate.toISOString(),
            maxResults: 50
        });

        const videoIds = data.items.map(({id})=>`${id.videoId}`);

        const videosData = this.youtubeApi.videos.list({
            id: videoIds,
            maxResults: 50,
            pageToken,
            part: ['statistics', 'snippet']
        });

        return [videosData.then(({data})=>data.items), data.nextPageToken];
        
    }

   
}