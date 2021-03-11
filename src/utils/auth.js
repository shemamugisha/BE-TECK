import 'dotenv/config';
import { sign } from 'jsonwebtoken';
import { compare, hash } from 'bcryptjs';

const { JWT } = process.env;

export const encryptPassword = async (password) => {
  const hashed = await hash(password, 10);
  return hashed;
};
export const decryptPassword = async (password, hashed) => {
  const isValid = await compare(password, hashed);
  return isValid;
};

export const signToken = (data) => {
  const token = sign(data, JWT, { expiresIn: '2h' });
  return token;
};
