import { Injectable } from '@nestjs/common';
import { CreateDropdownDto } from './dto/create-dropdown.dto';
import { UpdateDropdownDto } from './dto/update-dropdown.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Dropdown } from './entities/dropdown.entity';

@Injectable()
export class DropdownService {
  constructor(
    @InjectRepository(Dropdown)
    private readonly dropdownOptionRepository: Repository<Dropdown>,
) {}

// async create(option: Dropdown): Promise<Dropdown> {
//     return await this.dropdownOptionRepository.save(option);
// }

async create(createDropDownDto: CreateDropdownDto) {
  const dropdown= await this.dropdownOptionRepository.create(createDropDownDto)
  return this.dropdownOptionRepository.save(dropdown);
}

async findAll() {
    return await this.dropdownOptionRepository.find();
}
}
