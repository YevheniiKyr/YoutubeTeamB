import { IsOptional, IsString, IsISO8601 } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class DateFilterParams {
  @ApiProperty()
  @IsString()
  @IsISO8601()
  startDate: string;

  @ApiProperty()
  @IsString()
  @IsISO8601()
  endDate: string;

  @ApiProperty()
  @IsString()
  channelId: string;
}
