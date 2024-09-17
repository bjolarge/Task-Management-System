// import { Controller, Post, Body, Get, Query } from '@nestjs/common';
// import { PaystackService } from './paystack.service';

// @Controller('paystack')
// export class PaystackController {
//   constructor(private readonly paystackService: PaystackService) {}

//   @Post('create-transaction')
//   async createTransaction(@Body() body: { amount: number; email: string }) {
//     const { amount, email } = body;
//     return this.paystackService.createTransaction(amount, email);
//   }

//   @Get('verify-transaction')
//   async verifyTransaction(@Query('reference') reference: string) {
//     return this.paystackService.verifyTransaction(reference);
//   }
// }

import { Controller, Post, Get, Body, Query } from '@nestjs/common';
import { PaystackService } from './paystack.service';

@Controller('paystack')
export class PaystackController {
  constructor(private readonly paystackService: PaystackService) {}

  @Post('initialize')
  async initializePayment(@Body() body: { amount: number; email: string }) {
    return this.paystackService.initializePayment(body.amount, body.email);
  }

  @Get('verify')
  async verifyPayment(@Query('reference') reference: string) {
    return this.paystackService.verifyPayment(reference);
  }

  @Post('webhook')
  handleWebhook(@Body() webhookPayload: any) {
    // Handle webhook payload and update your database
    console.log('Webhook received:', webhookPayload);
    return { status: 'success' };
  }
}

