import 'dotenv/config';
import { findUser, createUser, updateUser } from '../services/userServices';
import successRes from '../utils/successHandler';
import errorRes from '../utils/errorHandler';
import {
  encryptPassword,
  decryptPassword,
  signToken,
  verifyToken,
} from '../utils/auth';
import sendEmail from '../utils/mail';

class userController {
  static async signup(req, res) {
    try {
      const existEmail = await findUser({ email: req.body.email });
      if (existEmail) {
        return errorRes(res, 400, 'user already registered');
      }
      const password = await encryptPassword(req.body.password);
      const user = await createUser({ ...req.body, password });

      return successRes(
        res,
        201,
        `Hey ${req.body.firstName} you are successfully registered`,
        user,
      );
    } catch (error) {
      return errorRes(res, 500, `${error.message}`);
    }
  }

  static async signin(req, res) {
    try {
      const foundUser = await findUser({ email: req.body.email });
      if (!foundUser) {
        return errorRes(res, 401, 'Email not found');
      }
      const pass = await decryptPassword(req.body.password, foundUser.password);
      if (!pass) {
        return errorRes(res, 401, 'Invalid password');
      }
      const token = signToken({ id: foundUser.id, email: foundUser.email });

      return successRes(res, 200, 'Signed in successfully', {
        token,
        foundUser,
      });
    } catch (error) {
      return errorRes(res, 500, `${error.message}`);
    }
  }

  static async forgortPassword(req, res) {
    const { HOST } = process.env;

    try {
      const user = await findUser({ email: req.body.email });
      if (!user) {
        return errorRes(res, 401, 'Email not found');
      }
      const token = signToken({ email: user.email, id: user.id });

      await sendEmail('forgotPassword', {
        email: user.email,
        id: user.id,
        token,
      });
      return successRes(
        res,
        200,
        'check your email',
        `${HOST}/user/reset/${token}`,
      );
    } catch (error) {
      return errorRes(res, 500, 'Error while requesting for reset password');
    }
  }

  static async resetPassword(req, res) {
    const { newPassword, rePassword } = req.body;
    try {
      const userDetails = verifyToken(req.params.token);

      const user = await findUser({ email: userDetails.email });
      if (!user) return errorRes(res, 403, 'Not user found ');

      if (newPassword !== rePassword) {
        return errorRes(res, 400, 'Password does not match!');
      }

      const pass = await encryptPassword(newPassword);

      const update = await updateUser({ password: pass }, { id: user.id });

      return successRes(res, 201, 'Password Updated Successfully', update);
    } catch (error) {
      console.log(error);
      return errorRes(res, 500, 'There was an error while reseting password');
    }
  }
}

export default userController;
