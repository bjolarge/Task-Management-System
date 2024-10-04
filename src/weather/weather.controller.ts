import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { WeatherService } from './weather.service';
import { Weather } from './entities/weather.entity';
// import { CreateWeatherDto } from './dto/create-weather.dto';
// import { UpdateWeatherDto } from './dto/update-weather.dto';

@Controller('weather')
export class WeatherController {
  constructor(private readonly weatherService: WeatherService) {}
  @Get('latest')
  async getLatestWeather(): Promise<Weather> {
    return this.weatherService.getLatestWeather();
  }

  @Post()
  async addWeather(@Body() weatherData: Partial<Weather>): Promise<void> {
    await this.weatherService.addWeather(weatherData);
  }
 
}
