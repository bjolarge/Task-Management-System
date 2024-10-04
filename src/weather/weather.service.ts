import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';
import { Weather } from './entities/weather.entity';

@Injectable()
export class WeatherService {
  @WebSocketServer() server: Server;

  constructor(
    @InjectRepository(Weather)
    private weatherRepository: Repository<Weather>,
  ) {}

  async getLatestWeather() {
    const latestWeather = await this.weatherRepository.findOne({
      order: { temperature: 'DESC' },
    });
    this.server.emit('latestWeather', latestWeather);
    return latestWeather;
  }

  // async getLatestWeather(): Promise<Weather[]> {
  //   return this.weatherRepository.find({
  //     order: {
  //       temperature: 'ASC', // Specify ascending order
  //     },
  //   });
  // }

  async addWeather(weatherData: Partial<Weather>) {
    const weather = this.weatherRepository.create(weatherData);
    await this.weatherRepository.save(weather);
    this.getLatestWeather(); // Notify clients
  }
}
