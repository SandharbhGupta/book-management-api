import request from 'supertest';
import app from '../app';

describe('Book API', () => {
  let bookId: string;

  // Test for creating a book
  describe('POST /api/books', () => {
    it('should create a new book', async () => {
      const res = await request(app)
        .post('/api/books')
        .send({
          title: 'Test Book',
          author: 'Test Author',
          publishedYear: 2022
        });
      
      expect(res.status).toBe(201);
      expect(res.body.success).toBe(true);
      expect(res.body.data).toHaveProperty('id');
      expect(res.body.data.title).toBe('Test Book');
      
      bookId = res.body.data.id;
    });

    it('should return validation error for invalid input', async () => {
      const res = await request(app)
        .post('/api/books')
        .send({
          title: '',
          author: 'Test Author',
          publishedYear: 'invalid'
        });
      
      expect(res.status).toBe(400);
      expect(res.body.success).toBe(false);
      expect(res.body.message).toContain('Validation error');
    });
  });

  // Test for getting all books
  describe('GET /api/books', () => {
    it('should get all books', async () => {
      const res = await request(app).get('/api/books');
      
      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(Array.isArray(res.body.data)).toBe(true);
      expect(res.body.data.length).toBeGreaterThan(0);
    });
  });

  // Test for getting a book by ID
  describe('GET /api/books/:id', () => {
    it('should get a book by ID', async () => {
      const res = await request(app).get(`/api/books/${bookId}`);
      
      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data).toHaveProperty('id', bookId);
    });

    it('should return 404 for non-existent book ID', async () => {
      const res = await request(app).get('/api/books/nonexistent-id');
      
      expect(res.status).toBe(404);
      expect(res.body.success).toBe(false);
    });
  });

  // Test for updating a book
  describe('PUT /api/books/:id', () => {
    it('should update a book', async () => {
      const res = await request(app)
        .put(`/api/books/${bookId}`)
        .send({
          title: 'Updated Test Book',
          author: 'Updated Test Author',
          publishedYear: 2023
        });
      
      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data).toHaveProperty('id', bookId);
      expect(res.body.data.title).toBe('Updated Test Book');
    });
  });

  // Test for deleting a book
  describe('DELETE /api/books/:id', () => {
    it('should delete a book', async () => {
      const res = await request(app).delete(`/api/books/${bookId}`);
      
      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.message).toContain('deleted successfully');
    });
  });

  // Test book import functionality
  describe('POST /api/books/import', () => {
    it('should import books from CSV', async () => {
      const csvContent = 
        'title,author,publishedYear\n' +
        'Book 1,Author 1,2020\n' +
        'Book 2,Author 2,2021\n' +
        'Book 3,Author 3,2022';
      
      const res = await request(app)
        .post('/api/books/import')
        .attach('file', Buffer.from(csvContent), 'books.csv');
      
      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.booksAdded).toBe(3);
    });

    it('should validate CSV content and return errors', async () => {
      const csvContent = 
        'title,author,publishedYear\n' +
        'Book 1,Author 1,invalid\n' +
        'Book 2,,2021\n' +
        'Book 3,Author 3,9999';
      
      const res = await request(app)
        .post('/api/books/import')
        .attach('file', Buffer.from(csvContent), 'books.csv');
      
      expect(res.status).toBe(400);
      expect(res.body.success).toBe(false);
      expect(res.body.errors.length).toBe(3);
    });
  });
});