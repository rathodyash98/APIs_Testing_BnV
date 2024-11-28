import { Request, Response, NextFunction } from "express";
import User from "../models/User.model";
import { generateToken } from "../utils/jwt.util";
import { UserDocument } from "../models/User.model"; // Assuming UserDocument is exported from User.model.ts

// Login controller
export const login = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { username, password } = req.body;

  try {
    // Find the user by username
    const user = await User.findOne({ username });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ message: "Invalid credentials." });
    }

    // Generate a token and send it back in the response
    const token = generateToken({ id: user._id });
    res.status(200).json({ token });
  } catch (error) {
    next(error);
  }
};

// Get user details controller
export const getUserDetails = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    // Assuming req.user is set by an authentication middleware
    const user = req.user as UserDocument;

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    // Return the user details in the response
    res.status(200).json({ user });
  } catch (error) {
    next(error);
  }
};
