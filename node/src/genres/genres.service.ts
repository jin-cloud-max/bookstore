import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { UpdateGenreDto } from './dto/update-genre.dto';

@Injectable()
export class GenresService {
  constructor(private prisma: PrismaService) {}

  async create(data: Prisma.GenderCreateInput) {
    const { name } = data;

    const findGender = await this.prisma.gender.findFirst({
      where: {
        name,
      },
    });

    if (findGender) {
      throw new HttpException('Gender Already exists', HttpStatus.BAD_REQUEST);
    }

    return this.prisma.gender.create({
      data,
    });
  }

  async findAll() {
    const genres = await this.prisma.gender.findMany();

    return genres;
  }

  findOne(id: number) {
    return `This action returns a #${id} genre`;
  }

  update(id: number, updateGenreDto: UpdateGenreDto) {
    return `This action updates a #${id} genre`;
  }

  remove(id: number) {
    return `This action removes a #${id} genre`;
  }
}
