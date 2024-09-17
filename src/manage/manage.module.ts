import { Module } from '@nestjs/common';
import { ManageService } from './manage.service';
import { ManageController } from './manage.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Manage } from './entities/manage.entity';
import { Management } from './entities/management.entity';
import { Comment } from './entities/comment.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Manage,Management,Comment])],
  controllers: [ManageController],
  providers: [ManageService],
})
export class ManageModule {}
