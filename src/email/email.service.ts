import { Inject, Injectable } from '@nestjs/common';
import { createTransport } from 'nodemailer';
import Mail from 'nodemailer/lib/mailer';
import EmailOptions from './emailOptions.interface';
import { EMAIL_CONFIG_OPTIONS } from './email.module-definition';
import { ConfigService } from '@nestjs/config';

@Injectable()
export default class EmailService {
  private nodemailerTransport: Mail;
 
  constructor(
    private readonly configService: ConfigService
  ) {
    this.nodemailerTransport = createTransport({
      service: configService.get('EMAIL_SERVICE'),
      auth: {
        user: configService.get('EMAIL_USER'),
        pass: configService.get('EMAIL_PASSWORD'),
      }
    });
  }
 
  sendMail(options: Mail.Options) {
    return this.nodemailerTransport.sendMail(options);
  }
}