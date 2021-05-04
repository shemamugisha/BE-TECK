/* eslint-disable function-paren-newline */
/* eslint-disable implicit-arrow-linebreak */
import 'dotenv/config';
import {
  createProduct,
  findAll,
  findProduct,
  updateProduct,
  deleteProduct,
} from '../services/productServices';
import uploader from '../config/cloudinary';
import successRes from '../utils/successHandler';
import errorRes from '../utils/errorHandler';
import sendEmail from '../utils/mail';
import Models from '../database/models';

const { Subscribers } = Models;
class Product {
  static async create(req, res) {
    try {
      const product = await createProduct({
        ...req.body,
        imageUrl: '',
        imageId: '',
      });

      if (req.files) {
        const tmp = req.files.image.tempFilePath;
        const result = await uploader.upload(tmp, (_, results) => results);
        product.imageUrl = result.url;
        product.imageId = result.public_id;
        product.save();
      }

      const subscriber = await Subscribers.findAll();
      subscriber.forEach(({ email }) =>
        sendEmail('subscribe', { email, brand: product.name, id: product.id }),
      );

      return successRes(res, 201, 'successfully created a Product', product);
    } catch (error) {
      console.log(error);
      return errorRes(res, 500, 'Error while creating a product');
    }
  }

  static async fetchAll(req, res) {
    try {
      const product = await findAll();
      return successRes(res, 200, 'Successfully fetched all products', product);
    } catch (error) {
      console.log(error);
      return errorRes(res, 500, 'There was an error while fetching products');
    }
  }

  static async fetchOne(req, res) {
    const { id } = req.params;
    try {
      const product = await findProduct({ id });
      return successRes(res, 200, 'Successfully fetched one product', product);
    } catch (error) {
      return errorRes(res, 500, 'There was an error while fetching product');
    }
  }

  static async update(req, res) {
    const { id } = req.params;

    try {
      const product = await updateProduct({ ...req.body }, { id });

      return successRes(res, 200, 'Successfully updated A product', product);
    } catch (error) {
      return errorRes(res, 500, 'There was an error while updating Product');
    }
  }

  static async delete(req, res) {
    const { id } = req.params;
    try {
      const product = await deleteProduct({ id });
      return successRes(res, 200, 'Successfully deleted a Product', product);
    } catch (error) {
      console.log(error);
      return errorRes(res, 500, 'There was an error while deleting A product');
    }
  }

  static async subscriber(req, res) {
    const { email } = req.body;
    try {
      if (!email) {
        errorRes(res, 404, 'Email not found');
      }

      const user = await Subscribers.create({ email });
      return successRes(
        res,
        201,
        'Successfully subscribed to our mailList',
        user,
      );
    } catch (error) {
      console.log(error);
      return errorRes(
        res,
        500,
        'There was an error while subscribing to our mailList',
      );
    }
  }
}

export default Product;
