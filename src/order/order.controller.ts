// src/orders/order.controller.ts
import { Controller, Post, Body, Get } from '@nestjs/common';
import { OrderService } from './order.service';
import { Order } from './entities/order.entity';

@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  async create(@Body() orderData: Partial<Order>): Promise<Order> {
    return this.orderService.create(orderData);
  }

  @Get()
  async findAll(): Promise<Order[]> {
    return this.orderService.findAll();
  }
}
