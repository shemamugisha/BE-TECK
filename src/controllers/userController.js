import { findUser, createUser, updateUser } from '../services/userServices';
import successRes from '../utils/successHandler';
import errorRes from '../utils/errorHandler';
import { encryptPassword, decryptPassword, signToken } from '../utils/auth';
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
    try {
      const { HOST } = process.env;
      const user = await findUser({ email: req.body.email });
      if (!user) {
        return errorRes(res, 401, 'Email not found');
      }
      const token = signToken({ email: user.email, id: user.id });

      console.log('hellllooooooooo', token);

      await sendEmail('forgotPassword', {
        email: user.email,
        id: user.id,
        token,
      });
      return successRes(
        res,
        200,
        'check your email',
        `${HOST}/api/users/reset/${token}`,
      );
    } catch (error) {
      return errorRes(res, 500, 'error while requesting');
    }
  }

  static async resetPassword(req, res) {
    try {
      const { email } = req.params;
      const foundUser = await _user.findOne({ where: { email } });
      const password = await encryptPassword(req.body.password);
      const { email: useremail } = verifyLink(
        req.params.token,
        foundUser.password,
      );
      if (!useremail) {
        return res.status(404).json({ message: 'user not email not found' });
      }

      await _user.update({ password }, { where: { email: useremail } });

      return successRes(
        res,
        201,
        'Thank you! You can now use your new password to login!',
        updatePassword,
      );
    } catch (error) {
      console.log('xxxxxxxxx', error);
      return errorRes(res, 500, 'There was an error while reseting password');
    }
  }
}

export default userController;
