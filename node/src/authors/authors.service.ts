import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Author, Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class AuthorsService {
  constructor(private prisma: PrismaService) {}

  async create(data: Prisma.AuthorCreateInput): Promise<Author> {
    const { name } = data;

    const findAuthor = await this.prisma.author.findFirst({
      where: {
        name,
      },
    });

    if (findAuthor) {
      throw new HttpException('Author not available', HttpStatus.BAD_REQUEST);
    }

    return this.prisma.author.create({
      data: {
        name,
      },
    });
  }

  async findAll() {
    const authors = await this.prisma.author.findMany({
      include: {
        Book: {
          select: {
            title: true,
            description: true,
            publisher: {
              select: {
                name: true,
              },
            },
          },
        },
      },
    });

    return authors;
  }

  findOne(id: number) {
    return `This action returns a #${id} author`;
  }

  update() {
    return `This action updates a author`;
  }

  remove(id: number) {
    return `This action removes a #${id} author`;
  }
}
