import successRes from '../utils/successHandler';

class Welcome {
  static async get(req, res) {
    return successRes(res, 200, 'Welcome to ZipTech Api');
  }
}

export default Welcome;
