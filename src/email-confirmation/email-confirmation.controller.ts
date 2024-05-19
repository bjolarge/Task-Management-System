import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { EmailConfirmationService } from './email-confirmation.service';
import { CreateEmailConfirmationDto } from './dto/create-email-confirmation.dto';
import { UpdateEmailConfirmationDto } from './dto/update-email-confirmation.dto';

@Controller('email-confirmation')
export class EmailConfirmationController {
  constructor(private readonly emailConfirmationService: EmailConfirmationService) {}

}
