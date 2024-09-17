import { Module } from '@nestjs/common';
import { PlentsService } from './plents.service';
import { PlentsController } from './plents.controller';
import { Plent } from './entities/plent.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Yent } from './entities/yent.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Plent,Yent])],
  controllers: [PlentsController],
  providers: [PlentsService],
})
export class PlentsModule {}
