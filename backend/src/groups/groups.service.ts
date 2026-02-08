import {
  Injectable,
  ForbiddenException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class GroupsService {
  constructor(private prisma: PrismaService) { }

  async findAll() {
    return this.prisma.studyGroup.findMany({
      include: {
        members: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
                avatar: true,
              },
            },
          },
        },
      },
    });
  }

  async findOne(id: string) {
    const group = await this.prisma.studyGroup.findUnique({
      where: { id },
      include: {
        members: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
                avatar: true,
                email: true,
              },
            },
          },
        },
      },
    });

    if (!group) {
      throw new NotFoundException('Group not found');
    }

    return group;
  }

  async create(
    data: { name: string; description?: string; courseId?: string },
    userId: string,
  ) {
    return this.prisma.studyGroup.create({
      data: {
        name: data.name,
        description: data.description,
        courseId: data.courseId,
        members: {
          create: {
            userId,
            role: 'ADMIN',
          },
        },
      },
      include: {
        members: true,
      },
    });
  }

  async join(groupId: string, userId: string) {
    const group = await this.prisma.studyGroup.findUnique({
      where: { id: groupId },
      include: {
        members: true,
      },
    });

    if (!group) {
      throw new NotFoundException('Group not found');
    }

    if (group.members.length >= group.maxMembers) {
      throw new ForbiddenException('Group is full');
    }

    const existingMember = group.members.find(
      (m) => m.userId === userId,
    );

    if (existingMember) {
      throw new ForbiddenException('Already a member');
    }

    return this.prisma.groupMember.create({
      data: {
        groupId,
        userId,
        role: 'MEMBER',
      },
    });
  }

  async leave(groupId: string, userId: string) {
    return this.prisma.groupMember.delete({
      where: {
        groupId_userId: {
          groupId,
          userId,
        },
      },
    });
  }

  async getUserGroups(userId: string) {
    return this.prisma.studyGroup.findMany({
      where: {
        members: {
          some: {
            userId,
          },
        },
      },
      include: {
        members: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
                avatar: true,
              },
            },
          },
        },
      },
    });
  }
}