import Joi from 'joi';
import joiRes from '../middlewares/validationMiddleware';

export const signupValidation = (req, res, next) => {
  const schema = Joi.object({
    firstName: Joi.string().min(2).max(64).required(),
    lastName: Joi.string().min(2).max(64).required(),
    password: Joi.string()
      .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
      .required(),
    email: Joi.string().required().email({
      minDomainSegments: 2,
    }),
  });
  joiRes(req, res, schema, next);
};

export const signinValidation = (req, res, next) => {
  const schema = Joi.object({
    email: Joi.string()
      .required()
      .email({ tlds: { allow: false } })
      .required(),
    password: Joi.string()
      .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
      .required(),
  });
  joiRes(req, res, schema, next);
};
