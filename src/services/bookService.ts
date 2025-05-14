import { Book, IBook, IBookInput, ValidationError, ImportResult } from '../models/book';

// In-memory database
let books: IBook[] = [];

export const getAllBooks = (): IBook[] => {
  return books;
};

export const getBookById = (id: string): IBook | undefined => {
  return books.find(book => book.id === id);
};

export const createBook = (bookInput: IBookInput): IBook => {
  const newBook = new Book(bookInput);
  books.push(newBook);
  return newBook;
};

export const updateBook = (id: string, bookInput: IBookInput): IBook | undefined => {
  const bookIndex = books.findIndex(book => book.id === id);
  
  if (bookIndex === -1) {
    return undefined;
  }
  
  const updatedBook = {
    ...books[bookIndex],
    ...bookInput,
  };
  
  books[bookIndex] = updatedBook;
  return updatedBook;
};

export const deleteBook = (id: string): boolean => {
  const initialLength = books.length;
  books = books.filter(book => book.id !== id);
  return books.length < initialLength;
};

export const validateBookInput = (input: any): string[] => {
  const errors: string[] = [];
  
  if (!input.title) {
    errors.push('Title is required');
  } else if (typeof input.title !== 'string') {
    errors.push('Title must be a string');
  }
  
  if (!input.author) {
    errors.push('Author is required');
  } else if (typeof input.author !== 'string') {
    errors.push('Author must be a string');
  }
  
  if (!input.publishedYear) {
    errors.push('Published year is required');
  } else {
    const year = Number(input.publishedYear);
    if (isNaN(year) || year <= 0) {
      errors.push('Published year must be a positive number');
    } else if (year < 1450 || year > new Date().getFullYear()) {
      errors.push(`Published year must be between 1450 and ${new Date().getFullYear()}`);
    }
  }
  
  return errors;
};

export const importBooksFromCsv = (fileContent: string): ImportResult => {
  const lines = fileContent.split('\n').filter(line => line.trim() !== '');
  
  // Check if file is empty
  if (lines.length === 0) {
    return {
      success: false,
      booksAdded: 0,
      errors: [{ row: 0, errors: ['Empty CSV file'] }]
    };
  }
  
  // Validate header
  const header = lines[0].toLowerCase().split(',').map(h => h.trim());
  const requiredColumns = ['title', 'author', 'publishedyear'];
  
  const missingColumns = requiredColumns.filter(col => !header.includes(col));
  if (missingColumns.length > 0) {
    return {
      success: false,
      booksAdded: 0,
      errors: [{ row: 1, errors: [`Missing required columns: ${missingColumns.join(', ')}`] }]
    };
  }
  
  // Get column indexes
  const titleIndex = header.indexOf('title');
  const authorIndex = header.indexOf('author');
  const publishedYearIndex = header.indexOf('publishedyear');
  
  const validationErrors: ValidationError[] = [];
  let booksAdded = 0;
  
  // Process data rows
  for (let i = 1; i < lines.length; i++) {
    const line = lines[i].trim();
    if (line === '') continue;
    
    const values = line.split(',');
    
    if (values.length !== header.length) {
      validationErrors.push({
        row: i + 1,
        errors: [`Expected ${header.length} columns but got ${values.length}`]
      });
      continue;
    }
    
    const bookInput: IBookInput = {
      title: values[titleIndex].trim(),
      author: values[authorIndex].trim(),
      publishedYear: parseInt(values[publishedYearIndex].trim(), 10)
    };
    
    const errors = validateBookInput(bookInput);
    
    if (errors.length > 0) {
      validationErrors.push({
        row: i + 1,
        errors: errors
      });
    } else {
      createBook(bookInput);
      booksAdded++;
    }
  }
  
  return {
    success: validationErrors.length === 0,
    booksAdded,
    errors: validationErrors
  };
};