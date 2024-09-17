import { Module } from '@nestjs/common';
import { FrozenService } from './frozen.service';
import { FrozenController } from './frozen.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Frozen } from './entities/frozen.entity';
import { Lorry } from './entities/lorry.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Frozen, Lorry])],
  controllers: [FrozenController],
  providers: [FrozenService],
})
export class FrozenModule {}
