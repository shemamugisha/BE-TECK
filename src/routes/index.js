import { Router } from 'express';
import welcomeRoute from './welcomeRoute';
import userRoute from './userRoutes';

const router = Router();

router.use('/', welcomeRoute);
router.use('/user', userRoute);

export default router;
