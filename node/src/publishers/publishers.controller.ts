import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { CreatePublisherDto } from './dto/create-publisher.dto';
import { PublishersService } from './publishers.service';

@Controller('publishers')
export class PublishersController {
  constructor(private readonly publishersService: PublishersService) {}

  @Post()
  create(@Body() { name }: CreatePublisherDto) {
    return this.publishersService.create(name);
  }

  @Get()
  findAll(
    @Query('limit') limit: string,
    @Query('page') page: string,
    @Query('name') name: string,
  ) {
    return this.publishersService.findAll({
      limit,
      page,
      name,
    });
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.publishersService.findOne(+id);
  }

  // @Patch(':id')
  // update(
  //   @Param('id') id: string,
  //   @Body() updatePublisherDto: UpdatePublisherDto,
  // ) {
  //   return this.publishersService.update(+id, updatePublisherDto);
  // }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.publishersService.remove(+id);
  }
}
