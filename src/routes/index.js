import { Router } from 'express';
import welcomeRoute from './welcomeRoute';

const router = Router();

router.use('/', welcomeRoute);

export default router;
