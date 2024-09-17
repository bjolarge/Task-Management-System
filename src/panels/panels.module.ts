import { Module } from '@nestjs/common';
import { PanelsService } from './panels.service';
import { PanelsController } from './panels.controller';
import { Panel } from './entities/panel.entity';
import { Chanters } from './entities/chanters.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports:[TypeOrmModule.forFeature([Panel,Chanters])],
  controllers: [PanelsController],
  providers: [PanelsService],
})
export class PanelsModule {}
