import { Module } from '@nestjs/common';
import { DeskService } from './desk.service';
import { DeskController } from './desk.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Lest } from './entities/lest.entity';
import { Desk } from './entities/desk.entity';
import { Commenters } from './entities/commenters.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Desk, Lest, Commenters])],
  controllers: [DeskController],
  providers: [DeskService],
})
export class DeskModule {}
