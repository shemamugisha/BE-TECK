import errorRes from '../utils/errorHandler';
import { verifyToken } from '../utils/auth';

const protect = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    if (!token) {
      return errorRes(res, 401, 'No token found');
    }
    const user = verifyToken(token);

    req.user = user;
    return next();
  } catch (error) {
    return errorRes(res, 403, 'Token not valid');
  }
};

export default protect;
