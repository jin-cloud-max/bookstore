import { Module } from '@nestjs/common';
import { AuthorsModule } from './authors/authors.module';
import { BooksModule } from './books/books.module';
import { PublishersModule } from './publishers/publishers.module';
import { GenresModule } from './genres/genres.module';

@Module({
  imports: [AuthorsModule, BooksModule, PublishersModule, GenresModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
