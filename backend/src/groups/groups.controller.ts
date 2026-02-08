import { Controller, Get, Post, Delete, Body, Param, UseGuards, Request } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GroupsService } from './groups.service';

class CreateGroupDto {
  name: string;
  description?: string;
  courseId?: string;
}

@Controller('groups')
export class GroupsController {
  constructor(private groupsService: GroupsService) {}

  @Get()
  async findAll() {
    return this.groupsService.findAll();
  }

  @Get('my')
  @UseGuards(AuthGuard('jwt'))
  async getMyGroups(@Request() req) {
    return this.groupsService.getUserGroups(req.user.id);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.groupsService.findOne(id);
  }

  @Post()
  @UseGuards(AuthGuard('jwt'))
  async create(@Body() dto: CreateGroupDto, @Request() req) {
    return this.groupsService.create(dto, req.user.id);
  }

  @Post(':id/join')
  @UseGuards(AuthGuard('jwt'))
  async join(@Param('id') id: string, @Request() req) {
    return this.groupsService.join(id, req.user.id);
  }

  @Delete(':id/leave')
  @UseGuards(AuthGuard('jwt'))
  async leave(@Param('id') id: string, @Request() req) {
    return this.groupsService.leave(id, req.user.id);
  }
}