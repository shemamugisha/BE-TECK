import errorRes from '../utils/errorHandler';

export default (req, res, schema, next) => {
  const { error } = schema.validate(req.body);
  if (error) {
    return errorRes(
      res,
      400,
      ` Validation error ${error.details[0].message.replace(/"/g, '')}`,
    );
  }
  return next();
};
