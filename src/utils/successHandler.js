export default (res, status, messsage, datas) => {
  res.status(status).json({
    messsage,
    success: true,
    data: datas,
  });
};
