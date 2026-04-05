const notFound = (req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error);
};

const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  
  if (statusCode === 500) {
    console.error('------- SERVER ERROR (500) -------');
    console.error(`Path: ${req.originalUrl}`);
    console.error(`Method: ${req.method}`);
    console.error(`Error: ${err.message}`);
    console.error('Stack:', err.stack);
    if (req.body) console.error('Body:', req.body);
    if (req.files) console.error('Files:', Object.keys(req.files));
    console.error('---------------------------------');
  }

  res.status(statusCode);
  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  });
};

export { notFound, errorHandler };
