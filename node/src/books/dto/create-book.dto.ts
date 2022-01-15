import { Author, Prisma, Publisher } from '@prisma/client';

export class CreateBookDto {
  author_id: string;
  publisher_id: string;
  genres_id: string[];
}
