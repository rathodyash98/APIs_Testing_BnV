import { Request, Response, NextFunction } from "express";

// Define the error middleware
const errorMiddleware = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  // Log the error stack for debugging purposes
  console.error(err.stack);

  // Respond with a 500 status code and error message
  res.status(500).json({
    message: err.message || "Internal Server Error",
  });
};

export default errorMiddleware;
