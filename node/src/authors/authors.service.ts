import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Author, Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

interface IUpdateAuthor {
  id: string;
  name: string;
}
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

  async findOne(name: string) {
    const author = await this.prisma.author.findFirst({
      where: {
        name,
      },
      include: {
        Book: {
          select: {
            title: true,
            description: true,
            id: true,
          },
        },
      },
    });

    if (!author) {
      throw new HttpException('Author not found', HttpStatus.NOT_FOUND);
    }

    return author;
  }

  async update({ id, name }: IUpdateAuthor) {
    const findAuthor = await this.prisma.author.findFirst({
      where: { id },
    });

    if (!findAuthor) {
      throw new HttpException('Author does not exist', HttpStatus.NOT_FOUND);
    }

    const author = await this.prisma.author.update({
      where: { id },
      data: {
        name,
      },
    });

    return author;
  }

  remove(id: number) {
    return `This action removes a #${id} author`;
  }
}
