import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { UpdatePublisherDto } from './dto/update-publisher.dto';

@Injectable()
export class PublishersService {
  constructor(private prisma: PrismaService) {}

  async create(data: Prisma.PublisherCreateInput) {
    const { name } = data;

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

  findAll() {
    return `This action returns all publishers`;
  }

  findOne(id: number) {
    return `This action returns a #${id} publisher`;
  }

  update(id: number, updatePublisherDto: UpdatePublisherDto) {
    return `This action updates a #${id} publisher`;
  }

  remove(id: number) {
    return `This action removes a #${id} publisher`;
  }
}
