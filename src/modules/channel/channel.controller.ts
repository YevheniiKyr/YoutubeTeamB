import {
  ClassSerializerInterceptor,
  Controller,
  Get,
  Query,
  UseInterceptors,
} from '@nestjs/common';

import { VideoEntity } from '../../db/entities/video.entity';
import { PaginationParams } from './dtos/pagination-params.dto';
import { CommentEntity } from '../../db/entities/comment.entity';
import { ChannelEntity } from '../../db/entities/channel.entity';
import { ChannelService } from './channel.service';
import { DateFilterParams } from './dtos/date-filter-params.dto';

@Controller('channels')
@UseInterceptors(ClassSerializerInterceptor)
export default class ChannelController {
  constructor(private readonly channelService: ChannelService) {}

  @Get('/')
  async getAllChannels(
    @Query() paginationParams: PaginationParams,
  ): Promise<ChannelEntity[]> {
    return this.channelService.getAllChannels(paginationParams);
  }

  @Get('/avg-comment-count')
  async getAverageCommentCount(
    @Query('channelId') channelId: string,
  ): Promise<{ count: number }> {
    return this.channelService.getAverageCommentCount(channelId);
  }

  @Get('/avg-likes-dislikes-ratio')
  async getAverageLikesDislikesRatio(
    @Query('channelId') channelId: string,
  ): Promise<{ ratio: number }> {
    return this.channelService.getAverageLikesDislikesRatio(channelId);
  }

  @Get('/video-count')
  async getVideoCount(
    @Query('country') countryCode: string,
    @Query() dateFilterParams?: DateFilterParams,
  ): Promise<{ count: number }> {
    return this.channelService.getVideoCount(
      countryCode,
      dateFilterParams?.startDate,
      dateFilterParams?.endDate,
    );
  }

  @Get('/videos')
  async getAllVideos(
    @Query() paginationParams: PaginationParams,
    @Query('channelId') channelId: string,
    @Query() dateFilterParams?: DateFilterParams,
  ): Promise<VideoEntity[]> {
    return this.channelService.getAllVideos(
      paginationParams,
      channelId,
      dateFilterParams?.startDate,
      dateFilterParams?.endDate,
    );
  }

  @Get('/views')
  async getTotalViews(
    @Query('country') countryCode: string,
    @Query() dateFilterParams?: DateFilterParams,
  ): Promise<{ views: number }> {
    return this.channelService.getTotalViews(
      countryCode,
      dateFilterParams?.startDate,
      dateFilterParams?.endDate,
    );
  }

  @Get('/comments')
  async getAllComments(
    @Query() paginationParams: PaginationParams,
    @Query('videoId') videoId: string,
    @Query() dateFilterParams?: DateFilterParams,
  ): Promise<CommentEntity[]> {
    return this.channelService.getAllComments(
      paginationParams,
      videoId,
      dateFilterParams?.startDate,
      dateFilterParams?.endDate,
    );
  }
}
