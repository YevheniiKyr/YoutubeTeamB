import { Injectable } from "@nestjs/common";
import { ChannelRepository } from "src/db/repositories/channel.repository";
import { CommentRepository } from "src/db/repositories/comment.repository";
import { VideoRepository } from "src/db/repositories/video.repository";
import { HttpService } from "@nestjs/axios";
import { youtubeConfig } from "src/configs/youtube.config";
import { youtube_v3 } from 'googleapis';

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
    }

    async saveYoutubeDataToDBByDateRange(startDate: Date, endDate: Date) {
        return this.youtubeApi.channels.list({
            part: ['statistics'],
            id: youtubeConfig.channelsList.map(({id})=>id),
        })
    }

   
}