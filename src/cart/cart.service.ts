import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cart } from './entities/cart.entity';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(Cart)
    private readonly cartRepository: Repository<Cart>,
  ) {}

  async findAll(): Promise<Cart[]> {
    return this.cartRepository.find();
  }

 
  findOne(id) {
    const cart =  this.cartRepository.findOne({where: {id}});
    if(!cart){
      throw new NotFoundException(`Cart with the given #${id} not found`);
    }
    return cart;
  }

 async create(createCartDto: CreateCartDto) {
    const cart = this.cartRepository.create(createCartDto);
    return this.cartRepository.save(cart);
  }

  async update(id: string, updateCartDto: UpdateCartDto) {
    const existingCart= await this.cartRepository.preload({
      id:+id,
      ...updateCartDto,
      //flavors,
    });
    if(!existingCart){
      throw new NotFoundException(`The Existing Cart with the given ${id} not found`);
    }
    return this.cartRepository.save(existingCart);
  }

  async remove(id:string) {
   const cart  = await this.cartRepository.delete(id);

    if (cart.affected === 0) {
      throw new NotFoundException(`Cart with ID "${id}" not found`);
    }
   // return this.testimonyRepository.remove(testimony);
  }
}
