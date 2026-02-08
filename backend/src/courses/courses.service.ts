import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { NotFoundException } from '@nestjs/common';

@Injectable()
export class CoursesService {
  constructor(private prisma: PrismaService) { }

  async findAll() {
    return this.prisma.course.findMany({
      where: { published: true },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: string) {
    const course = await this.prisma.course.findUnique({
      where: { id }, // ใช้ string เหมือนเดิม
      include: {
        lessons: {
          orderBy: { orderIndex: 'asc' },
        },
      },
    });

    // เพิ่มตรงนี้: ถ้า Database คืนค่า null มา ให้บอก Frontend ว่าหาไม่เจอ
    if (!course) {
      throw new NotFoundException(`Course with ID ${id} not found`);
    }

    return course;
  }

  async enroll(userId: string, courseId: string) {
    return this.prisma.enrollment.create({
      data: {
        userId,
        courseId,
      },
    });
  }

  async getUserEnrollments(userId: string) {
    return this.prisma.enrollment.findMany({
      where: { userId },
      include: {
        course: true,
      },
    });
  }
}