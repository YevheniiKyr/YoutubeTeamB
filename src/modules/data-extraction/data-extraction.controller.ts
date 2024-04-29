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

  @Post('/back-fill-youtube-data/2pkaVOCC1t')
  async backFillYoutubeData(
    @Body('monthsAgo', ParseIntPipe) monthsAgo: number,
  ): Promise<void> {
    return this.dataExtractionService.backFillYoutubeData(monthsAgo);
  }
}
