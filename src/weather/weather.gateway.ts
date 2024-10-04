import { WebSocketGateway, SubscribeMessage, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';
import { WeatherService } from './weather.service';

@WebSocketGateway()
export class WeatherGateway {
  @WebSocketServer() server: Server;

  constructor(private weatherService: WeatherService) {}

  handleConnection(client: any) {
    console.log('Client connected now:', client.id);
  }

  @SubscribeMessage('requestLatestWeather')
  handleLatestWeatherRequest(client: any) {
    this.weatherService.getLatestWeather();
  }
}
