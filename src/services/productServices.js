import Models from '../database/models';

const { Product } = Models;

export const createProduct = async (product) => {
  const createdProduct = await Product.create(product);
  return createdProduct;
};

export const findAll = async () => {
  const fetchedProducted = await Product.findAll();
  return fetchedProducted;
};

export const findProduct = async (param) => {
  const product = await Product.findOne({ where: param });
  return product;
};

export const updateProduct = async (product, param) => {
  const updatedProduct = await Product.update(product, {
    where: param,
  });
  return updatedProduct;
};

export const deleteProduct = async (param) => {
  const product = await Product.destroy({ where: param });
  return product;
};
