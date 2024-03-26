import { Injectable } from '@nestjs/common';

import { CommentRepository } from '../../db/repositories/comment.repository';
import { ChannelRepository } from '../../db/repositories/channel.repository';
import { VideoRepository } from '../../db/repositories/video.repository';
import { PaginationParams } from './dtos/pagination-params.dto';
import { ChannelEntity } from '../../db/entities/channel.entity';
import { VideoEntity } from '../../db/entities/video.entity';
import { CommentEntity } from '../../db/entities/comment.entity';

@Injectable()
export class ChannelService {
  constructor(
    private readonly commentRepository: CommentRepository,
    private readonly channelRepository: ChannelRepository,
    private readonly videoRepository: VideoRepository,
  ) {}

  public async getAllChannels({
    p = 1,
    limit,
  }: PaginationParams): Promise<ChannelEntity[]> {
    return this.channelRepository.find({
      order: {
        id: 'ASC',
      },
      ...(limit && {
        skip: (p - 1) * limit,
        take: limit,
      }),
    });
  }

  public async getAverageCommentCount(channelId: string): Promise<number> {
    return this.videoRepository.average('commentCount', {
      channelId,
    });
  }

  public async getAverageLikesDislikesRatio(
    channelId: string,
  ): Promise<number> {
    const averageLikesCount = await this.videoRepository.average('likeCount', {
      channelId,
    });
    const averageDislikesCount = await this.videoRepository.average(
      'dislikeCount',
      {
        channelId,
      },
    );

    if (!averageLikesCount || !averageDislikesCount) {
      return null;
    }

    return averageLikesCount / averageDislikesCount;
  }

  public async getVideoCount(
    countryCode: string,
    startDate?: string,
    endDate?: string,
  ) {
    const query = this.videoRepository
      .createQueryBuilder('video')
      .innerJoin('video.channel', 'channel')
      .where('channel.country = :country', { country: countryCode });

    if (startDate) {
      query.andWhere('video.recordingDate > :startDate', { startDate });
    }

    if (endDate) {
      query.andWhere('video.recordingDate < :endDate', { endDate });
    }

    return query.getCount();
  }

  public async getAllVideos(
    channelId: string,
    startDate?: string,
    endDate?: string,
  ): Promise<VideoEntity[]> {
    const query = this.videoRepository
      .createQueryBuilder('video')
      .where('video.channelId = :channelId', { channelId });

    if (startDate) {
      query.andWhere('video.recordingDate > :startDate', { startDate });
    }

    if (endDate) {
      query.andWhere('video.recordingDate < :endDate', { endDate });
    }

    return query.getMany();
  }

  public async getAllViews(
    countryCode: string,
    startDate?: string,
    endDate?: string,
  ): Promise<number> {
    const qb = this.videoRepository
      .createQueryBuilder('video')
      .innerJoin('video.channel', 'channel')
      .where('channel.country = :country', { country: countryCode });

    if (startDate) {
      qb.andWhere('video.recordingDate > :startDate', { startDate });
    }

    if (endDate) {
      qb.andWhere('video.recordingDate < :endDate', { endDate });
    }

    return qb.select('SUM(video.views)', 'totalViews').getRawOne();
  }

  public async getAllComments(
    videoId: string,
    startDate?: string,
    endDate?: string,
  ): Promise<CommentEntity[]> {
    const query = this.commentRepository
      .createQueryBuilder('comment')
      .where('comment.videoId = :videoId', { videoId });

    if (startDate) {
      query.andWhere('comment.publishedAt > :startDate', { startDate });
    }

    if (endDate) {
      query.andWhere('comment.publishedAt < :endDate', { endDate });
    }

    return query.getMany();
  }
}
