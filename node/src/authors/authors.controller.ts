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
import { AuthorsService } from './authors.service';
import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';

@Controller('authors')
export class AuthorsController {
  constructor(private readonly authorsService: AuthorsService) {}

  @Post()
  create(@Body() { name }: CreateAuthorDto) {
    return this.authorsService.create({ name });
  }

  @Get()
  findAll() {
    return this.authorsService.findAll();
  }

  @Get('/author')
  findOne(@Query('name') name: string) {
    return this.authorsService.findOne(name);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() { name }: UpdateAuthorDto) {
    return this.authorsService.update({ id, name });
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.authorsService.remove(+id);
  }
}
