import { Module } from '@nestjs/common';

import ChannelController from './channel.controller';
import { ChannelService } from './channel.service';
import { DatabaseModule } from '../../db/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [ChannelController],
  providers: [ChannelService],
})
export class ChannelModule {}
