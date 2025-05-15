# Book Management REST API

A Node.js and TypeScript REST API for managing books with CRUD operations and bulk import functionality.

## Features

- Full CRUD API (Create, Read, Update, Delete) for books
- CSV bulk import with manual validation
- Logging with `morgan`
- Centralized error handling middleware
- Uses UUIDs for book IDs
- Type-safe development with TypeScript
- Simple in-memory data storage (no external database required)
- Basic unit tests using `Jest`
- Environment variable support with `dotenv`

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
You can import this Postman collection to test all endpoints:
[📁 Download Collection (JSON)](https://github.com/SandharbhGupta/book-management-api/blob/main/Book_Managment_API.postman_collection.json)

To import:
1. Open Postman.
2. Click Import → Upload the file.
3. Use the localhost:3000 base URL.

## Getting Started

1. Clone the repository
   ```
   git clone https://github.com/SandharbhGupta/book-management-api.git
   cd book-management-api
   ```
3. Install dependencies
   ```
   npm install
   ```
5. Run in development mode
   ```
   npm run dev
   ```
7. Run tests
   ```
   npm test
   ```
9. Build for production
    ```
   npm run build
   npm start
    ```
##  Example JSON for Create/Update
```
{
  "title": "Clean Code",
  "author": "Robert C. Martin",
  "publishedYear": 2008
}
```

##  Example CSV Import Format

The CSV file for bulk import should have the following structure:

```
title,author,publishedYear
Ulysses,James Joyce,1927
Waste Land,T.S Eliot,2010
Treasure Island , R.L. Stevenson, 2002
```
Use form-data with key file in Postman to upload.
Each row will be validated for proper format and data.

🛠 Technologies Used
- Node.js
- TypeScript
- Express.js
- Multer (for file upload)
- Morgan (for logging)
- Jest (for testing)
- dotenv

📌 Notes
- This project uses in-memory storage (no database) to focus on core logic.
- You can replace the service layer to connect with a DB if needed.

👨‍💻 Author
Developed by Sandharbh Gupta for Creuto Interview Task.
