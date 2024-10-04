import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Repository } from 'typeorm';
import { Rating } from './entities/rating.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { CreateRatingDto } from './dto/create-rating.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Rating)
    private ratingRepository: Repository<Rating>,
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
) {}

async createProduct(createProductDto:CreateProductDto) { 
  const product = await this.productRepository.create(createProductDto)
   return this.productRepository.save(product);
 }

async create(createRatingDto: CreateRatingDto): Promise<Rating> {
  const product = await this.productRepository.findOneBy({ id: createRatingDto.productId });
  if (!product) {
    throw new Error('Product not found');
  }

  const rating = this.ratingRepository.create({ ...createRatingDto, product });
  return this.ratingRepository.save(rating);
}
}
