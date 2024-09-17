import { Module } from '@nestjs/common';
import { DenService } from './den.service';
import { DenController } from './den.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Den } from './entities/den.entity';
import { Lents } from './entities/lents.entity';
import { Commentator } from './entities/commentator.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Den,Lents, Commentator])],
  controllers: [DenController],
  providers: [DenService],
})
export class DenModule {}
