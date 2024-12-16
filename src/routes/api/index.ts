import { Router } from 'express';
import { thoughtRouter } from './thoughtRouters.js';
import { userRouter } from './userRoutes.js';

const router = Router();

router.use('/users', userRouter);
router.use('/thoughts', thoughtRouter);

export default router;
