import { Router } from 'express';
const router = Router();
import bookController from '../controllers/book.js';
import middleware from '../middleware/auth.js';

router.get('/api/books/search', middleware.validateToken, bookController.searchBooks);
// router.get('/test', bookController.searchBooks);

export default router;
