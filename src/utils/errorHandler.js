export default (res, status, message) => {
  res.status(status).json({
    message,
    success: false,
  });
};
