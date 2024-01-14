import { Router } from 'express';
const router = Router();
import login from '../controllers/login.js';

router.post('/api/register', login.register);
router.post('/api/login', login.login);
router.get('/api/provider/login/:provider', login.loginUserWithProvider);
router.get('/oauth2/redirect/:provider', login.loginUserCallbackWithProvider);

export default router;
