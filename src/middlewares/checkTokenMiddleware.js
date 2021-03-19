import errorRes from '../utils/errorHandler';
import { findUser } from '../services/userServices';
import { verifyToken } from '../utils/auth';

export default async (req, res, next) => {
  try {
    const { token } = req.params;
    if (!token) errorRes(res, 404, 'No token received');
  } catch (error) {
    return errorRes(res, 401, 'Not authorized, check your token');
  }
};
