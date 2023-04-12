import AuthRoutes from './auth';
import TodoRoutes from './todos';
import { authMiddleware } from '../middlewares';

import { Router } from 'express';

const router = Router();

router.use('/auth', AuthRoutes);
router.use('/todos', authMiddleware, TodoRoutes);

export default router;
