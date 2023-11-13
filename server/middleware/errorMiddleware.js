const notFound = (req, res, next) => {
  const error = new Error("Route not found");
  res.status(400);
  next(error);
};

const errorMiddleware = (error, req, res, next) => {
  const statusCode = error.statusCode || 500;
  res.status(statusCode).json({
    status: false,
    message: error.message,
  });
};
module.exports = { notFound, errorMiddleware };
