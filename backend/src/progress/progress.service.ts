import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ProgressService {
  constructor(private prisma: PrismaService) {}

  async updateProgress(userId: string, lessonId: string, data: any) {
    return this.prisma.progress.upsert({
      where: {
        userId_lessonId: {
          userId,
          lessonId,
        },
      },
      create: {
        userId,
        lessonId,
        ...data,
      },
      update: data,
    });
  }

  async getUserProgress(userId: string, courseId: string) {
    const lessons = await this.prisma.lesson.findMany({
      where: { courseId },
    });

    const progress = await this.prisma.progress.findMany({
      where: {
        userId,
        lessonId: { in: lessons.map((l) => l.id) },
      },
    });

    return {
      lessons,
      progress,
    };
  }

  async getDashboard(userId: string) {
    const enrollments = await this.prisma.enrollment.findMany({
      where: { userId },
      include: {
        course: true,
      },
    });

    const totalLessons = await this.prisma.lesson.count({
      where: {
        courseId: { in: enrollments.map((e) => e.courseId) },
      },
    });

    const completedLessons = await this.prisma.progress.count({
      where: {
        userId,
        completed: true,
      },
    });

    return {
      enrollments,
      stats: {
        coursesEnrolled: enrollments.length,
        coursesCompleted: enrollments.filter((e) => e.status === 'COMPLETED').length,
        totalLessons,
        completedLessons,
      },
    };
  }
}