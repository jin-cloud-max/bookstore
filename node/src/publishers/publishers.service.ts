import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

interface IFindPublishers {
  limit: string;
  page: string;
  name?: string;
}
@Injectable()
export class PublishersService {
  constructor(private prisma: PrismaService) {}

  async create(name: string) {
    const findPublisher = await this.prisma.publisher.findFirst({
      where: {
        name,
      },
    });

    if (findPublisher) {
      throw new HttpException(
        'Publisher already exist',
        HttpStatus.BAD_REQUEST,
      );
    }

    return this.prisma.publisher.create({
      data: {
        name,
      },
    });
  }

  async findAll({ limit, page, name }: IFindPublishers) {
    const parseLimit = Number(limit);
    const parsePage = Number(page);

    const publishers = await this.prisma.publisher.findMany({
      skip: parseLimit * parsePage - parseLimit,
      take: parseLimit,

      orderBy: {
        name: 'asc',
      },
      where: {
        name: {
          contains: name,
        },
      },
      select: {
        name: true,
        id: true,
        _count: true,
        Book: {
          select: {
            id: true,
            author: true,
            title: true,
            description: true,
          },
          take: 3,
        },
      },
    });

    return publishers;
  }

  findOne(id: number) {
    return `This action returns a #${id} publisher`;
  }

  // update(id: number, updatePublisherDto: UpdatePublisherDto) {
  //   return `This action updates a #${id} publisher`;
  // }

  remove(id: number) {
    return `This action removes a #${id} publisher`;
  }
}
