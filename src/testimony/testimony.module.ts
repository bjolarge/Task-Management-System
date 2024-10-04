import { Module } from '@nestjs/common';
import { TestimonyService } from './testimony.service';
import { TestimonyController } from './testimony.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Testimony } from './entities/testimony.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Testimony])],
  controllers: [TestimonyController],
  providers: [TestimonyService]
})
export class TestimonyModule {}
