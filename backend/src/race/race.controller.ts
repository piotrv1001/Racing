import { Race } from './race.entity';
import { RaceService } from './race.service';
import { Controller, Post, Get, Request, Param, Delete } from '@nestjs/common';

@Controller('races')
export class RaceController {
  constructor(private readonly raceService: RaceService) {}

  @Post()
  create(@Request() req): Promise<Race> {
    return this.raceService.create(req.body);
  }

  @Get()
  getAll(): Promise<Race[]> {
    return this.raceService.getAll();
  }

  @Get(':id')
  getById(@Param('id') id: number): Promise<Race> {
    return this.raceService.getById(id);
  }

  @Delete(':id')
  delete(@Param('id') id: number): Promise<void> {
    return this.raceService.delete(id);
  }
}