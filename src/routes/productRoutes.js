import { Router } from 'express';
import productController from '../controllers/productController';
import protect from '../middlewares/authMiddleware';

const router = Router();

router.route('/save').post(productController.create);
router.route('/subscribe').post(protect, productController.subscriber);
router.route('/findall').get(protect, productController.fetchAll);
router.route('/findone/:id').get(protect, productController.fetchOne);
router.route('/update/:id').patch(protect, productController.update);
router.route('/delete/:id').delete(protect, productController.delete);

export default router;
