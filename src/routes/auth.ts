import { Router } from 'express';
import { checkRequiredBodyProperties } from '../middlewares/validationMiddleware';
import * as authController from '../controllers/authController';

const router = Router();

router.post('/login', checkRequiredBodyProperties(['email', 'password']), authController.login);
router.post('/register', checkRequiredBodyProperties(['name', 'email', 'password', 'passwordConfirmation']), authController.register);

export default router;
