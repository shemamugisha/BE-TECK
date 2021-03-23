import Joi from 'joi';
import joiRes from '../middlewares/validationMiddleware';

export const signupValidation = (req, res, next) => {
  const schema = Joi.object({
    firstName: Joi.string().min(2).max(64).required(),
    lastName: Joi.string().min(2).max(64).required(),
    password: Joi.string().min(6).required(),
    email: Joi.string().required().email({
      minDomainSegments: 2,
    }),
  });
  joiRes(req, res, schema, next);
};

export const signinValidation = (req, res, next) => {
  const schema = Joi.object({
    email: Joi.string()
      .email({ tlds: { allow: false } })
      .required(),
    password: Joi.string().min(6).required(),
  });
  joiRes(req, res, schema, next);
};

export const resetPassValidation = (req, res, next) => {
  const schema = Joi.object({
    newPassword: Joi.string().min(6).required(),
    rePassword: Joi.string().min(6).required(),
  });
  joiRes(req, res, schema, next);
};
