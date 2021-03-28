import { Router } from 'express';
import welcomeRoute from './welcomeRoute';
import userRoute from './userRoutes';
import productRoute from './productRoutes';

const router = Router();

router.use('/', welcomeRoute);
router.use('/user', userRoute);
router.use('/product', productRoute);

export default router;
