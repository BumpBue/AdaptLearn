import { Controller, Get, Post, Param, UseGuards, Request } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CoursesService } from './courses.service';

@Controller('courses')
export class CoursesController {
  constructor(private coursesService: CoursesService) {}

  @Get()
  async findAll() {
    return this.coursesService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.coursesService.findOne(id);
  }

  @Post(':id/enroll')
  @UseGuards(AuthGuard('jwt'))
  async enroll(@Param('id') id: string, @Request() req) {
    return this.coursesService.enroll(req.user.id, id);
  }

  @Get('my/enrollments')
  @UseGuards(AuthGuard('jwt'))
  async getMyEnrollments(@Request() req) {
    return this.coursesService.getUserEnrollments(req.user.id);
  }
}