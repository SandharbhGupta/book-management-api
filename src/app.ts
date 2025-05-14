import express, { Application } from 'express';
import morgan from 'morgan';
import cors from 'cors';
import bookRoutes from './routes/bookRoutes';
import { errorHandler, notFoundHandler } from './middleware/errorHandler';

const app: Application = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

// Routes
app.use('/api/books', bookRoutes);

// Health check route
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok', message: 'Book Management API is running' });
});

// Error handling
app.use(notFoundHandler);
app.use(errorHandler);

export default app;