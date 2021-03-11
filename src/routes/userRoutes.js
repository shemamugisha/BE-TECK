import { Router } from 'express';
import userController from '../controllers/userController';
import {
  signupValidation,
  signinValidation,
} from '../validators/userValidator';

const router = Router();

router.route('/signup').post(signupValidation, userController.signup);
router.route('/signin').post(signinValidation, userController.signin);

export default router;
