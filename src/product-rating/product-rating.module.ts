import { Module } from '@nestjs/common';
import { ProductRatingService } from './product-rating.service';
import { ProductRatingController } from './product-rating.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductRating } from './entities/product-rating.entity';
import { Product } from './entities/product.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ProductRating, Product])],
  controllers: [ProductRatingController],
  providers: [ProductRatingService],
})
export class ProductRatingModule {}
