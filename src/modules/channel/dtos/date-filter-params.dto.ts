import { IsOptional, IsString, IsISO8601 } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class DateFilterParams {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @IsISO8601()
  startDate?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @IsISO8601()
  endDate?: string;
}
