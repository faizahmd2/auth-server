const express = require('express');
const router = express.Router();
const userController = require('../controllers/login');

router.post('/api/register', userController.register);
router.post('/api/login', userController.login);
router.get('/api/provider/login/:provider', userController.loginUserWithProvider);
router.get('/api/oauth2/redirect/:provider', userController.loginUserCallbackWithProvider);

module.exports = router;
