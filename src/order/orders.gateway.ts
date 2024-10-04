// src/orders/orders.gateway.ts
import {
    WebSocketGateway,
    WebSocketServer,
    SubscribeMessage,
    OnGatewayConnection,
    OnGatewayDisconnect,
  } from '@nestjs/websockets';
  import { Server } from 'socket.io';
  import { OrderService } from './order.service';
  
  @WebSocketGateway({
    cors: {
      origin: 'http://localhost:3000', // Your Next.js app URL
      methods: ['GET', 'POST'],
      credentials: true, // Allow credentials if needed
    },
  })
  export class OrdersGateway implements OnGatewayConnection, OnGatewayDisconnect {
    @WebSocketServer() server: Server;
  
    constructor(private readonly orderService: OrderService) {}
  
    handleConnection(client: any) {
      console.log('Client connected:', client.id);
    }
  
    handleDisconnect(client: any) {
      console.log('Client disconnected:', client.id);
    }
  
    @SubscribeMessage('newOrder')
    async handleNewOrder(orderData: any) {
      const newOrder = await this.orderService.create(orderData);
      this.server.emit('orderCreated', newOrder);
    }
  }
  