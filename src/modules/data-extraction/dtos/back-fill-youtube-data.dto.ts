import { ApiProperty } from '@nestjs/swagger';
import { IsISO8601, IsNotEmpty, IsString } from 'class-validator';

export class BackFillYoutubeData {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @IsISO8601()
  dateFrom: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @IsISO8601()
  dateTo: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  channelId: string;
}
