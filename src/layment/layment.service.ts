import { CreateLaymentDto } from './dto/create-layment.dto';
import { UpdateLaymentDto } from './dto/update-layment.dto';
import { Injectable } from '@nestjs/common';
import { lastValueFrom } from 'rxjs';
import {HttpService} from "@nestjs/axios"
//import { HttpServer } from '@nestjs/common';

@Injectable()
export class LaymentService {
  private readonly flutterwaveUrl = 'https://api.flutterwave.com/v3/payments';
  private readonly flutterwaveSecretKey = process.env.FLW_SECRET_KEY;

  constructor(private readonly httpService: HttpService) {}

  async makePayment(): Promise<any> {
    const response = await lastValueFrom(
      this.httpService.post(this.flutterwaveUrl, {
        // other fields...
        bank_transfer_options: {
          expires: 3600,
        },
      }, {
        headers: {
          Authorization: `Bearer ${this.flutterwaveSecretKey}`,
        },
      })
    );

    return response.data;
  }
}
