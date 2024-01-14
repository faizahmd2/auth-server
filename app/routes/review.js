import { Router } from 'express';
const router = Router();
import review from '../controllers/review.js';
import auth from '../middleware/auth.js';

router.post('/api/reviews/post', auth.validateToken, review.addBookReviews);
router.get('/api/reviews/:bookId', review.getBookReviews);

export default router;
