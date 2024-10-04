import { Module } from '@nestjs/common';
import { WeatherService } from './weather.service';
import { WeatherController } from './weather.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Weather } from './entities/weather.entity';
import { WeatherGateway } from './weather.gateway';

@Module({
  imports:[TypeOrmModule.forFeature([Weather])],
  controllers: [WeatherController],
  providers: [WeatherService, WeatherGateway],
})
export class WeatherModule {}
