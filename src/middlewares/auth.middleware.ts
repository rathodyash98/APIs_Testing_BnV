import { Request, Response, NextFunction } from "express";
import User, { IUser } from "../models/User.model";
import { verifyToken } from "../utils/jwt.util";

// Extend the Request type to include a user field
interface AuthenticatedRequest extends Request {
  user?: IUser;
}

export const authMiddleware = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const authHeader = req.headers.authorization;
  const token = authHeader?.split(" ")[1];

  if (!token) {
    res.status(401).json({ message: "Access token is missing" });
    return;
  }

  try {
    // Verify the token and extract the payload
    const decoded = verifyToken(token) as { id: string };

    // Find the user associated with the token
    const user = await User.findById(decoded.id);
    if (!user) {
      res.status(401).json({ message: "User not found" });
      return;
    }

    // Attach the user to the request object
    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
};
