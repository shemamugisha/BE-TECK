import { Router } from 'express';
import userController from '../controllers/userController';
import {
  signupValidation,
  signinValidation,
} from '../validators/userValidator';
import checkToken from '../middlewares/checkTokenMiddleware';

const router = Router();

router.route('/signup').post(signupValidation, userController.signup);
router.route('/signin').post(signinValidation, userController.signin);
router.route('/forgot').post(userController.forgortPassword);
router.route('/reset').patch(checkToken, userController.resetPassword);

export default router;
