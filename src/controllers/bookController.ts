import { Request, Response, NextFunction } from 'express';
import * as bookService from '../services/bookService';
import { ApiError } from '../middleware/errorHandler';
import { IBookInput } from '../models/book';

export const getAllBooks = (req: Request, res: Response, next: NextFunction) => {
  try {
    const books = bookService.getAllBooks();
    res.status(200).json({
      success: true,
      count: books.length,
      data: books
    });
  } catch (error) {
    next(error);
  }
};

export const getBookById = (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const book = bookService.getBookById(id);
    
    if (!book) {
      throw new ApiError(404, `Book with id ${id} not found`);
    }
    
    res.status(200).json({
      success: true,
      data: book
    });
  } catch (error) {
    next(error);
  }
};

export const createBook = (req: Request, res: Response, next: NextFunction) => {
  try {
    const bookInput: IBookInput = req.body;
    
    const validationErrors = bookService.validateBookInput(bookInput);
    if (validationErrors.length > 0) {
      throw new ApiError(400, `Validation error: ${validationErrors.join(', ')}`);
    }
    
    const newBook = bookService.createBook(bookInput);
    
    res.status(201).json({
      success: true,
      data: newBook
    });
  } catch (error) {
    next(error);
  }
};

export const updateBook = (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const bookInput: IBookInput = req.body;
    
    const validationErrors = bookService.validateBookInput(bookInput);
    if (validationErrors.length > 0) {
      throw new ApiError(400, `Validation error: ${validationErrors.join(', ')}`);
    }
    
    const updatedBook = bookService.updateBook(id, bookInput);
    
    if (!updatedBook) {
      throw new ApiError(404, `Book with id ${id} not found`);
    }
    
    res.status(200).json({
      success: true,
      data: updatedBook
    });
  } catch (error) {
    next(error);
  }
};

export const deleteBook = (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const deleted = bookService.deleteBook(id);
    
    if (!deleted) {
      throw new ApiError(404, `Book with id ${id} not found`);
    }
    
    res.status(200).json({
      success: true,
      message: `Book with id ${id} deleted successfully`
    });
  } catch (error) {
    next(error);
  }
};

export const importBooks = (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.file) {
      throw new ApiError(400, 'No CSV file uploaded');
    }
    
    const fileContent = req.file.buffer.toString('utf-8');
    const result = bookService.importBooksFromCsv(fileContent);
    
    res.status(result.success ? 200 : 400).json({
      success: result.success,
      booksAdded: result.booksAdded,
      errors: result.errors
    });
  } catch (error) {
    next(error);
  }
};