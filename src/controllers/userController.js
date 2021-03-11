import { findUser, createUser } from '../services/userServices';
import successRes from '../utils/successHandler';
import errorRes from '../utils/errorHandler';
import { encryptPassword, decryptPassword, signToken } from '../utils/auth';

class userController {
  static async signup(req, res) {
    try {
      const existEmail = await findUser({ email: req.body.email });
      if (existEmail) {
        return errorRes(res, 400, 'user already registered');
      }
      const password = await encryptPassword(req.body.password);
      const user = await createUser({ ...req.body, password });

      return successRes(res, 201, 'User registered successfully', user);
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

      return successRes(res, 200, 'Signed in succefully', { token, foundUser });
    } catch (error) {
      return errorRes(res, 500, `${error.message}`);
    }
  }
}

export default userController;
