import { Router } from 'express';
import Welcome from '../controllers/Welcome';

const router = Router();

router.route('/').get(Welcome);

export default router;
