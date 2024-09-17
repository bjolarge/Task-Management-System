// import { Injectable } from '@nestjs/common';
// import { ConfigService } from '@nestjs/config';
// import { HttpService } from '@nestjs/axios';

// @Injectable()
// export class PaystackService {
//   private readonly paystackSecretKey: string;
//   private readonly paystackBaseUrl: string = 'https://api.paystack.co';

//   constructor(
//     private readonly httpService: HttpService,
//     private readonly configService: ConfigService,
//   ) {
//     this.paystackSecretKey = this.configService.get<string>('PAYSTACK_SECRET_KEY');
//   }

//   async createTransaction(amount: number, email: string): Promise<any> {
//     const url = `${this.paystackBaseUrl}/transaction/initialize`;

//     const response = await this.httpService.post(
//       url,
//       {
//         amount,
//         email,
//         // Include any additional parameters as needed
//       },
//       {
//         headers: {
//           Authorization: `Bearer ${this.paystackSecretKey}`,
//           'Content-Type': 'application/json',
//         },
//       },
//     ).toPromise();

//     return response.data;
//   }

//   async verifyTransaction(reference: string): Promise<any> {
//     const url = `${this.paystackBaseUrl}/transaction/verify/${reference}`;

//     const response = await this.httpService.get(url, {
//       headers: {
//         Authorization: `Bearer ${this.paystackSecretKey}`,
//       },
//     }).toPromise();

//     return response.data;
//   }
// }


import { Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class PaystackService {
  private readonly paystackUrl = 'https://api.paystack.co';
  private readonly secretKey =  this.configService.get<string>('PAYSTACK_SECRET_KEY')
  //'YOUR_PAYSTACK_SECRET_KEY';

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {}

  async initializePayment(amount: number, email: string) {
    const response = await firstValueFrom(
      this.httpService.post(
        `${this.paystackUrl}/transaction/initialize`,
        {
          amount: amount * 100, 
          email,
        },
        {
          headers: {
            Authorization: `Bearer ${this.secretKey}`,
            'Content-Type': 'application/json',
          },
        },
      ),
    );

    return response.data;
  }

  async verifyPayment(reference: string) {
    const response = await firstValueFrom(
      this.httpService.get(
        `${this.paystackUrl}/transaction/verify/${reference}`,
        {
          headers: {
            Authorization: `Bearer ${this.secretKey}`,
          },
        },
      ),
    );

    return response.data;
  }
}
