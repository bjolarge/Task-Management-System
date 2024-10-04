import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTestimonyDto } from './dto/create-testimony.dto';
import { UpdateTestimonyDto } from './dto/update-testimony.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Testimony } from './entities/testimony.entity';
import { Repository } from 'typeorm';
import { Observable, of } from 'rxjs';
//const slugify = require('slugify');


@Injectable()
export class TestimonyService {
  constructor( @InjectRepository(Testimony)
  private readonly testimonyRepository:Repository<Testimony>
  ){}

   async create(createTestimonyDto:CreateTestimonyDto) { 
   const testimony = await this.testimonyRepository.create(createTestimonyDto)
    return this.testimonyRepository.save(testimony);
  }

  findAll() {
    return this.testimonyRepository.find();
  }

  //getting the name of the users
  findByUsername(name: string): Promise<Testimony | undefined> {
    const testimony= this.testimonyRepository.findOne({ where:{name} }); 
    if(!testimony){
      throw new NotFoundException(`Testimony with the given #${name} not found`);
    }
    return testimony;
}
// to get a slug
// generateSlug(name: string): Observable<string> {
//   return of(slugify(name));
// }

  findOne(id) {
    const testimony =  this.testimonyRepository.findOne({where: {id}});
    if(!testimony){
      throw new NotFoundException(`Testimony with the given #${id} not found`);
    }
    return testimony;
  }

  async update(id: string, updateTestimonyDto: UpdateTestimonyDto) {
    const existingTestimony= await this.testimonyRepository.preload({
      id:+id,
      ...updateTestimonyDto,
      //flavors,
    });
    if(!existingTestimony){
      throw new NotFoundException(`The Testimony with the given ${id} not found`);
    }
    return this.testimonyRepository.save(existingTestimony);
  }

  async remove(id:string) {
   // const testimony = await this.findOne(id);
   const testimony  = await this.testimonyRepository.delete(id);

    if (testimony.affected === 0) {
      throw new NotFoundException(`Testimony with ID "${id}" not found`);
    }
   // return this.testimonyRepository.remove(testimony);
  }
}
