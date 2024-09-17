import { Controller, Post, Param, Body } from '@nestjs/common';
import { DeliveryService } from './delivery.service';

@Controller('deliveries')
export class DeliveryController {
  constructor(private readonly deliveryService: DeliveryService) {}

  @Post('notify/:id')
  async notifyUser(@Param('id') id: number, @Body('details') details: string) {
    await this.deliveryService.notifyUserOfDelivery(id, details);
    return { message: 'Notification sent successfully' };
  }
}
