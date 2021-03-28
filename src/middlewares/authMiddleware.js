import errorRes from '../utils/errorHandler';
import { verifyToken } from '../utils/auth';

const protect = async (req, res, next) => {
  try {
    console.log('xxxxxxx', req.headers);
    const token = req.headers.authorization.split(' ')[1];
    if (!token) {
      return errorRes(res, 401, 'No token found');
    }

    console.log('xxxxxxx', token);

    const user = verifyToken(token);

    req.user = user;
    return next();
  } catch (error) {
    console.log(error);
    return errorRes(res, 403, 'Token not valid');
  }
};

export default protect;
