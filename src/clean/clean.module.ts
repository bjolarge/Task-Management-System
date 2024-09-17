import { Module } from '@nestjs/common';
import { CleanService } from './clean.service';
import { CleanController } from './clean.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Clean } from './entities/clean.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Clean])],
  controllers: [CleanController],
  providers: [CleanService],
})
export class CleanModule {}
