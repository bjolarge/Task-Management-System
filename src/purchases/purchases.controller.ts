import { Controller, Post, Body, Get } from '@nestjs/common';
import { PurchasesService } from './purchases.service';
import { Purchase } from './entities/purchase.entity';

@Controller('purchases')
export class PurchasesController {
  constructor(private readonly purchasesService: PurchasesService) {}

  @Post('webhook')
  async handleWebhook(@Body() purchaseData: Partial<Purchase>) {
    return this.purchasesService.create(purchaseData);
  }

  // // @Get('latest')
  // // async getLatestPurchase(): Promise<Purchase> {
  // //   return this.purchasesService.findLatest();
  // // }


  @Get('latest')
  async getUsersOrderedByName() {
    return this.purchasesService.findLatest();
  }
}
