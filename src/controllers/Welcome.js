import asyncHandler from 'express-async-handler';

export default asyncHandler((req, res) => {
  res.json({
    message: 'Welcome to ZipTech Api',
  });
});
