import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { Production } from './entities/production.entity';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';

@Injectable()
export class ProductsService {
  constructor(@InjectRepository(Product)
  private readonly productsRepository:Repository<Product>,
 // @InjectRepository(Production)
  //private readonly productionRepository:Repository<Production>,
  private readonly entityManager:EntityManager,
  private cloudinary: CloudinaryService
  ){}

  // async uploadImageToCloudinary(file: Express.Multer.File) {
  //   return await this.cloudinary.uploadImage(file).catch(() => {
  //     throw new BadRequestException('Invalid file type.');
  //   });
  // }

  create(createProductDto: CreateProductDto) {
    const production= new Production({
   ...createProductDto.production,
    });
    
    const product = new Product({
      ...createProductDto,
      production,
    });

    return this.entityManager.save(product);
  }

  findAll() {
    return this.productsRepository.find();
  }

  findOne(id: number) {
    return this.productsRepository
    .findOne({
    where:{id},
    relations:{production:true}})
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
