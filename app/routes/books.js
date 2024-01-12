const express = require('express');
const router = express.Router();
const bookController = require('../controllers/book');
const middleware = require('../middleware/auth')

router.get('/api/books/search', middleware.validateToken, bookController.searchBooks);
// router.get('/api/books/search', bookController.searchBooks);

module.exports = router;
