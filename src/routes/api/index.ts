import { Router } from 'express';
import { thoughtRouter } from './thoughtRouters.js';
import { userRouter } from './userRoutes.js';

const router = Router();

// Both routers.
router.use('/users', userRouter);
router.use('/thoughts', thoughtRouter);

export default router;
