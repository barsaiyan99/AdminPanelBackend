const notFound = (err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode),
    res.json({
      message: err.message,
    });
};

const errorHandler = (req, res, next) => {
  res.status(404);

  next(error);
};

export { notFound, errorHandler };
