import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { UpdateBookDto } from './dto/update-book.dto';

interface ICreateBook extends Prisma.BookCreateInput {
  author_id: string;
  publisher_id: string;
  genres_id: string[];
}

@Injectable()
export class BooksService {
  constructor(private prisma: PrismaService) {}

  async create({
    description,
    title,
    author_id,
    publisher_id,
    genres_id,
  }: ICreateBook) {
    const findBookByTitle = await this.prisma.book.findFirst({
      where: {
        title,
      },
    });

    if (findBookByTitle) {
      throw new HttpException('Book already exists', HttpStatus.BAD_REQUEST);
    }

    return this.prisma.book.create({
      data: {
        description,
        title,
        author: {
          connect: {
            id: author_id,
          },
        },
        publisher: {
          connect: {
            id: publisher_id,
          },
        },
        Book_Gender: {
          create: genres_id.map((gender) => ({
            gender: {
              connect: {
                id: gender,
              },
            },
          })),
        },
      },
    });
  }

  async findAll(page: string, limit: string, title?: string) {
    const parseLimit = Number(limit);
    const parsePage = Number(page);

    const books = await this.prisma.book.findMany({
      skip: parseLimit * parsePage - parseLimit,
      take: parseLimit,
      orderBy: {
        title: 'asc',
      },
      where: {
        title: {
          contains: title,
        },
      },
      include: {
        Book_Gender: {
          select: {
            gender: true,
          },
        },
        author: {
          select: {
            name: true,
          },
        },
        publisher: {
          select: {
            name: true,
          },
        },
      },
    });

    return books;
  }

  async findOne(title: string) {
    const book = await this.prisma.book.findFirst({
      where: {
        title,
      },
      include: {
        Book_Gender: {
          select: {
            gender: true,
          },
        },
        author: {
          select: {
            name: true,
          },
        },
        publisher: {
          select: {
            name: true,
          },
        },
      },
    });

    if (!book) {
      throw new HttpException('Book not found', HttpStatus.NOT_FOUND);
    }

    return book;
  }

  update(id: number, updateBookDto: UpdateBookDto) {
    return `This action updates a #${id} book`;
  }

  remove(id: number) {
    return `This action removes a #${id} book`;
  }
}
