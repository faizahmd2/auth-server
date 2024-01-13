const express = require('express');
const router = express.Router();
const userController = require('../controllers/login');

router.post('/register', userController.register);
router.post('/login', userController.login);
router.get('/provider/login/:provider', userController.loginUserWithProvider);
router.get('/oauth2/redirect/:provider', userController.loginUserCallbackWithProvider);

module.exports = router;
