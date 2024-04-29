import {
  Body,
  Controller,
  Injectable,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { DataExtractionService } from './data-extraction.service';

@Controller('data-extraction')
@Injectable()
export class DataExtractionController {
  constructor(private readonly dataExtractionService: DataExtractionService) {}

  @Post('/back-fill-youtube-data')
  async backFillYoutubeData(
    @Body('dateFrom', ParseIntPipe) dateFrom: number,
    @Body('dateTo', ParseIntPipe) dateTo: number,
    @Body('dateTo') channelId: string,
  ): Promise<void> {
    return this.dataExtractionService.backFillYoutubeData(dateFrom, dateTo, channelId);
  }
}
