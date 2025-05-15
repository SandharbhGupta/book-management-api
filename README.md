# Book Management REST API

A Node.js and TypeScript REST API for managing books with CRUD operations and bulk import functionality.

## Features

- Complete CRUD operations for books
- Bulk import of books via CSV with validation
- TypeScript for type safety
- Centralized error handling
- Request logging with Morgan
- Unit tests with Jest
- Environment variable configuration

## Project Structure

The project follows a service-based architecture:

```
├── src/
│   ├── config/         # Environment and configuration files
│   ├── controllers/    # Request handlers
│   ├── middleware/     # Custom middleware (error handling, etc.)
│   ├── models/         # Data models and interfaces
│   ├── routes/         # API routes
│   ├── services/       # Business logic
│   ├── __tests__/      # Unit tests
│   ├── app.ts          # Express app setup
│   └── index.ts        # Entry point
├── .env                # Environment variables
├── package.json        # Project dependencies and scripts
├── tsconfig.json       # TypeScript configuration
└── jest.config.js      # Jest configuration
```

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/books | Get list of all books |
| GET | /api/books/:id | Get details of a specific book |
| POST | /api/books | Add a new book |
| PUT | /api/books/:id | Update an existing book |
| DELETE | /api/books/:id | Delete a book |
| POST | /api/books/import | Import books from CSV file |

## 📦 Postman Collection

[📁 Download Collection (JSON)](https://github.com/SandharbhGupta/book-management-api/blob/main/Book_Managment_API.postman_collection.json)

## Getting Started

1. Clone the repository
2. Install dependencies: `npm install`
3. Run in development mode: `npm run dev`
4. Run tests: `npm test`
5. Build for production: `npm run build`

## CSV Import Format

The CSV file for bulk import should have the following structure:

```
title,author,publishedYear
Book Title 1,Author Name 1,2020
Book Title 2,Author Name 2,2021
```

Each row will be validated for proper format and data.
