import { Module } from '@nestjs/common';
import { LockService } from './lock.service';
import { LockController } from './lock.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Lock } from './entities/lock.entity';
import { Pank } from './entities/pank.entity';
import { Lomment } from './entities/lomment.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Lock, Pank, Lomment])],
  controllers: [LockController],
  providers: [LockService],
})
export class LockModule {}
