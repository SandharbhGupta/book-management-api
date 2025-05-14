import { v4 as uuidv4 } from 'uuid';

export interface IBook {
  id: string;
  title: string;
  author: string;
  publishedYear: number;
}

export interface IBookInput {
  title: string;
  author: string;
  publishedYear: number;
}

export class Book implements IBook {
  id: string;
  title: string;
  author: string;
  publishedYear: number;

  constructor(bookInput: IBookInput) {
    this.id = uuidv4();
    this.title = bookInput.title;
    this.author = bookInput.author;
    this.publishedYear = bookInput.publishedYear;
  }
}

export interface ValidationError {
  row: number;
  errors: string[];
}

export interface ImportResult {
  success: boolean;
  booksAdded: number;
  errors: ValidationError[];
}