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

  public async getAverageCommentCount(
    channelId: string,
  ): Promise<{ count: number }> {
    const count = await this.videoRepository.average('commentCount', {
      channelId,
    });

    return { count };
  }

  public async getAverageLikesDislikesRatio(
    channelId: string,
  ): Promise<{ ratio: number }> {
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

    return { ratio: averageLikesCount / averageDislikesCount };
  }

  public async getVideoCount(
    countryCode: string,
    startDate?: string,
    endDate?: string,
  ): Promise<{ count: number }> {
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

    const count = await query.getCount();

    return { count };
  }

  public async getAllVideos(
    { p = 1, limit }: PaginationParams,
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

    return limit
      ? query
          .limit(limit)
          .offset((p - 1) * limit)
          .getMany()
      : query.getMany();
  }

  public async getTotalViews(
    countryCode: string,
    startDate?: string,
    endDate?: string,
  ): Promise<{ views: number }> {
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

    const totalViews = await qb
      .select('SUM(video.views)', 'totalViews')
      .getRawOne();

    return { views: totalViews };
  }

  public async getAllComments(
    { p = 1, limit }: PaginationParams,
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

    return limit
      ? query
          .limit(limit)
          .offset((p - 1) * limit)
          .getMany()
      : query.getMany();
  }
}
