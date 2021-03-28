import {
  createMessage,
  deleteMessage,
  findAll,
} from '../services/messageServices';

import successRes from '../utils/successHandler';
import errorRes from '../utils/errorHandler';

class Message {
  static async create(req, res) {
    try {
      const message = await createMessage({
        ...req.body,
      });

      successRes(res, 201, 'successfuly sending message', message);
    } catch (error) {
      errorRes(res, 500, 'There was an error while sending product');
    }
  }

  static async fetchAll(req, res) {
    try {
      const message = await findAll();
      successRes(res, 200, 'successfuly fetched all message', message);
    } catch (error) {
      errorRes(res, 500, 'There was an error while fetching messages');
    }
  }

  static async delete(req, res) {
    const { id } = req.params;
    try {
      const message = await deleteMessage({ id });
      successRes(res, 200, 'Successfuly deleted a message', message);
    } catch (error) {
      errorRes(res, 500, 'There was an error while deleting message');
    }
  }
}

export default Message;
