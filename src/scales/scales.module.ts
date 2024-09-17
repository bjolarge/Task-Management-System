import { Module } from '@nestjs/common';
import { ScalesService } from './scales.service';
import { ScalesController } from './scales.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Scale } from './entities/scale.entity';
import { Scaling } from './entities/scaling.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Scale, Scaling])],
  controllers: [ScalesController],
  providers: [ScalesService],
})
export class ScalesModule {}
