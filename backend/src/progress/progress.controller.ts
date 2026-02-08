import { Controller, Get, Post, Body, Param, UseGuards, Request } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ProgressService } from './progress.service';

@Controller('progress')
@UseGuards(AuthGuard('jwt'))
export class ProgressController {
  constructor(private progressService: ProgressService) {}

  @Post('lesson/:lessonId')
  async updateProgress(
    @Param('lessonId') lessonId: string,
    @Body() body: any,
    @Request() req,
  ) {
    return this.progressService.updateProgress(req.user.id, lessonId, body);
  }

  @Get('course/:courseId')
  async getCourseProgress(@Param('courseId') courseId: string, @Request() req) {
    return this.progressService.getUserProgress(req.user.id, courseId);
  }

  @Get('dashboard')
  async getDashboard(@Request() req) {
    return this.progressService.getDashboard(req.user.id);
  }
}