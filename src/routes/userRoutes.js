import { Router } from 'express';
import userController from '../controllers/userController';
import {
  signupValidation,
  signinValidation,
  resetPassValidation,
} from '../validators/userValidator';

const router = Router();

router.route('/signup').post(signupValidation, userController.signup);
router.route('/signin').post(signinValidation, userController.signin);
router.route('/forgot').post(userController.forgortPassword);
router
  .route('/reset/:token')
  .patch(resetPassValidation, userController.resetPassword);

export default router;
