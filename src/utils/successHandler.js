export default (res, status, message, datas) => {
  res.status(status).json({
    message,
    success: true,
    data: datas,
  });
};
