const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/review');
const middleware = require('../middleware/auth')

router.post('/api/reviews/post', middleware.validateToken, reviewController.addBookReviews);
router.get('/api/reviews/:bookId', reviewController.getBookReviews);

module.exports = router;
