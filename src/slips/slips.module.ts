import { Module } from '@nestjs/common';
import { SlipsService } from './slips.service';
import { SlipsController } from './slips.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Slip } from './entities/slip.entity';
import { Flip } from './entities/flip.entity';
import { Tip } from './entities/tip.entity';
import { Tag } from './entities/tag.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Slip, Flip, Tip, Tag])],
  controllers: [SlipsController],
  providers: [SlipsService],
})
export class SlipsModule {}
