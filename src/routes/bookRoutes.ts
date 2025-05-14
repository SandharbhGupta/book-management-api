import { Router } from 'express';
import multer from 'multer';
import * as bookController from '../controllers/bookController';

const router = Router();
const upload = multer({ storage: multer.memoryStorage() });

/**
 * @route   GET /api/books
 * @desc    Get all books
 */
router.get('/', bookController.getAllBooks);

/**
 * @route   GET /api/books/:id
 * @desc    Get a book by ID
 */
router.get('/:id', bookController.getBookById);

/**
 * @route   POST /api/books
 * @desc    Create a new book
 */
router.post('/', bookController.createBook);

/**
 * @route   PUT /api/books/:id
 * @desc    Update a book
 */
router.put('/:id', bookController.updateBook);

/**
 * @route   DELETE /api/books/:id
 * @desc    Delete a book
 */
router.delete('/:id', bookController.deleteBook);

/**
 * @route   POST /api/books/import
 * @desc    Import books from CSV
 */
router.post('/import', upload.single('file'), bookController.importBooks);

export default router;