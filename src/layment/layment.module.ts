import { Module } from '@nestjs/common';
import { LaymentService } from './layment.service';
import { LaymentController } from './layment.controller';
//import { HttpModule } from '@nestjs/common';
import { HttpModule} from '@nestjs/axios';

@Module({
  imports:[HttpModule],
  controllers: [LaymentController],
  providers: [LaymentService],
})
export class LaymentModule {}
