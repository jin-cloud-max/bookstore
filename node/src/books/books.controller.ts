import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { BooksService } from './books.service';
import { UpdateBookDto } from './dto/update-book.dto';

interface ICreateBook extends Prisma.BookCreateInput {
  author_id: string;
  publisher_id: string;
  genres_id: string[];
}

@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Post()
  create(@Body() createBookDto: ICreateBook) {
    return this.booksService.create(createBookDto);
  }

  @Get()
  findAll(@Query('page') page: string, @Query('limit') limit: string) {
    return this.booksService.findAll(page, limit);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.booksService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBookDto: UpdateBookDto) {
    return this.booksService.update(+id, updateBookDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.booksService.remove(+id);
  }
}
