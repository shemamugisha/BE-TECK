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
}

export default Product;
