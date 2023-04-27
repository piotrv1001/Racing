import {
  Controller,
  Get,
  Delete,
  Param,
  Request,
  Post,
  Put,
} from '@nestjs/common';
import { ScoreService } from './score.service';
import { Score } from './score.entity';

@Controller('scores')
export class ScoreController {
  constructor(private readonly scoreService: ScoreService) {}

  @Post()
  create(@Request() req): Promise<Score> {
    return this.scoreService.create(req.body);
  }

  @Put('updateMany')
  updateMany(@Request() req): Promise<Score[]> {
    return this.scoreService.updateMany(req.body);
  }

  @Get(':groupId/:seasonId/sum-points-by-user')
  async getSumPointsByGroupIdAndSeasonId(
    @Param('groupId') groupId: number,
    @Param('seasonId') seasonId: number,
  ) {
    const grouppedPoints =
      await this.scoreService.getSumPointsByGroupIdAndSeasonId(
        groupId,
        seasonId,
      );

    const response = {};
    grouppedPoints.forEach((points, userId) => {
      response[userId] = points;
    });

    return response;
  }

  @Get(':userId/:groupId/:seasonId/sum-points')
  async sumPointsByUserIdAndGroupIdAndSeasonId(
    @Param('userId') userId: number,
    @Param('groupId') groupId: number,
    @Param('seasonId') seasonId: number,
  ): Promise<{ sumPoints: number }> {
    const sumPoints =
      await this.scoreService.sumPointsByUserIdAndGroupIdAndSeasonId(
        userId,
        groupId,
        seasonId,
      );
    return { sumPoints };
  }

  @Get('/races/:raceId/groups/:groupId')
  async getByRaceAndGroup(
    @Param('raceId') raceId: number,
    @Param('groupId') groupId: number,
  ) {
    const grouppedScores = await this.scoreService.getScoresByGroupAndRace(
      groupId,
      raceId,
    );

    const response = {};
    grouppedScores.forEach((predictions, userId) => {
      response[userId] = predictions;
    });

    return response;
  }

  @Get()
  getAll(): Promise<Score[]> {
    return this.scoreService.getAll();
  }

  @Get(':id')
  getById(@Param('id') id: number): Promise<Score> {
    return this.scoreService.getById(id);
  }

  @Delete(':id')
  delete(@Param('id') id: number): Promise<void> {
    return this.scoreService.delete(id);
  }
}
