const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/review');
const middleware = require('../middleware/auth')

router.post('/reviews/post', middleware.validateToken, reviewController.addBookReviews);
router.get('/reviews/:bookId', reviewController.getBookReviews);

module.exports = router;
