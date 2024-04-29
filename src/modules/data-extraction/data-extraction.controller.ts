import { Body, Controller, Injectable, Post } from '@nestjs/common';
import { DataExtractionService } from './data-extraction.service';
import { BackFillYoutubeData } from './dtos/back-fill-youtube-data.dto';

@Controller('data-extraction')
@Injectable()
export class DataExtractionController {
  constructor(private readonly dataExtractionService: DataExtractionService) {}

  @Post('/back-fill-youtube-data')
  async backFillYoutubeData(
    @Body() { dateFrom, dateTo, channelId }: BackFillYoutubeData,
  ): Promise<void> {
    return this.dataExtractionService.backFillYoutubeData(
      dateFrom,
      dateTo,
      channelId,
    );
  }
}
