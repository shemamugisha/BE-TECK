export default (res, status, messsage) => {
  res.status(status).json({
    messsage,
    success: false,
  });
};
