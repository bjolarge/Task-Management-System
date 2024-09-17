import { Module } from '@nestjs/common';
import { LearnerService } from './learner.service';
import { LearnerController } from './learner.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Learner } from './entities/learner.entity';
import { Harpner } from './entities/harpner.entity';
import { Lept } from './entities/lept.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Learner, Harpner, Lept])],
  controllers: [LearnerController],
  providers: [LearnerService],
})
export class LearnerModule {}
