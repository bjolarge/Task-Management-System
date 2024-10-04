// src/product-rating/product-rating.controller.ts

import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ProductRatingService } from './product-rating.service';
import { ProductRating } from './entities/product-rating.entity';

@Controller('products')
export class ProductRatingController {
    constructor(private readonly productRatingService: ProductRatingService) {}

    @Post(':id/ratings')
    async createRating(@Param('id') productId: number, @Body() rating: ProductRating) {
        return this.productRatingService.createRating(productId, rating);
    }

    @Get(':id/rating')
    async getRatings(@Param('id') productId: number) {
        return this.productRatingService.getRatings(productId);
    }
}
