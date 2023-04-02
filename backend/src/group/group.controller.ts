import { Controller, Get, Post, Delete, Param, Request } from '@nestjs/common';
import { GroupService } from './group.service';
import { Group } from './group.entity';

@Controller('groups')
export class GroupController {
  constructor(private readonly groupService: GroupService) {}

  @Post()
  create(@Request() req): Promise<Group> {
    return this.groupService.create(req.body);
  }

  @Get()
  getAll(): Promise<Group[]> {
    return this.groupService.getAll();
  }

  @Get(':id')
  getById(@Param('id') id: number): Promise<Group> {
    return this.groupService.getById(id);
  }

  @Delete(':id')
  delete(@Param('id') id: number): Promise<void> {
    return this.groupService.delete(id);
  }
}