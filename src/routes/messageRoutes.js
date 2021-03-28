import { Router } from 'express';
import messageController from '../controllers/messageController';
import protect from '../middlewares/authMiddleware';

const router = Router();

router.route('/save').post(protect, messageController.create);
router.route('/findall').get(protect, messageController.fetchAll);
router.route('/delete/:id').delete(protect, messageController.delete);

export default router;
