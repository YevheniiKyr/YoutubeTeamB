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
  ): Promise<number> {
    return this.channelService.getAverageCommentCount(channelId);
  }

  @Get('/avg-likes-dislikes-ratio')
  async getAverageLikesDislikesRatio(
    @Query('channelId') channelId: string,
  ): Promise<number> {
    return this.channelService.getAverageLikesDislikesRatio(channelId);
  }

  @Get('/video-count')
  async getVideoCount(
    @Query('country') countryCode: string,
    @Query('startDate') startDate?: string,
    @Query('endDate') endDate?: string,
  ): Promise<number> {
    return this.channelService.getVideoCount(countryCode, startDate, endDate);
  }

  @Get('/videos')
  async getAllVideos(
    @Query('channelId') channelId: string,
    @Query('startDate') startDate?: string,
    @Query('endDate') endDate?: string,
  ): Promise<VideoEntity[]> {
    return this.channelService.getAllVideos(channelId, startDate, endDate);
  }

  @Get('/views')
  async getAllViews(
    @Query('country') countryCode: string,
    @Query('startDate') startDate?: string,
    @Query('endDate') endDate?: string,
  ): Promise<number> {
    return this.channelService.getAllViews(countryCode, startDate, endDate);
  }

  @Get('/comments')
  async getAllComments(
    @Query('videoId') videoId: string,
    @Query('startDate') startDate?: string,
    @Query('endDate') endDate?: string,
  ): Promise<CommentEntity[]> {
    return this.channelService.getAllComments(videoId, startDate, endDate);
  }
}