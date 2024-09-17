import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DropdownService } from './dropdown.service';
import { CreateDropdownDto } from './dto/create-dropdown.dto';
import { UpdateDropdownDto } from './dto/update-dropdown.dto';

@Controller('dropdown')
export class DropdownController {
  constructor(private readonly dropdownService: DropdownService) {}

  @Get()
    async findAll() {
        return this.dropdownService.findAll();
    }

    // @Post()
    // async create(@Body() option: DropdownOption) {
    //     return this.dropdownService.create(option);
    // }

    @Post()
    create(@Body() createdropdown:CreateDropdownDto) {
      return this.dropdownService.create(createdropdown);
    }
}
