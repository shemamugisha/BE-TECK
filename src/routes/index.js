import { Router } from 'express';
import welcomeRoute from './welcomeRoute';
import userRoute from './userRoutes';
import productRoute from './productRoutes';
import messageRoute from './messageRoutes';

const router = Router();

router.use('/', welcomeRoute);
router.use('/user', userRoute);
router.use('/product', productRoute);
router.use('/message', messageRoute);

export default router;
