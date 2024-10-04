import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { ProductRating } from './entities/product-rating.entity';

@Injectable()
export class ProductRatingService {
    constructor(
        @InjectRepository(ProductRating)
        private productRatingRepository: Repository<ProductRating>,
        @InjectRepository(Product)
        private productRepository: Repository<Product>,
    ) {}

    async createRating(productId: number, rating: ProductRating): Promise<ProductRating> {
        const product = await this.productRepository.findOneBy({ id: productId });
        if (!product) {
            throw new Error('Product not found');
        }

        const newRating = this.productRatingRepository.create(rating);
        newRating.product = product;
        return this.productRatingRepository.save(newRating);
    }

    async getRatings(productId: number): Promise<ProductRating[]> {
        return this.productRatingRepository.find({
            where: { product: { id: productId } },
        });
    }
}
