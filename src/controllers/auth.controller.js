import User from "../models/User.model.js";
import { generateToken } from "../utils/jwt.util.js";

export const login = async (req, res, next) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    const token = generateToken({ id: user._id });
    res.status(200).json({ token });
  } catch (error) {
    next(error);
  }
};


export const getUserDetails = async (req, res) => {
  try {
    const user = req.user; // Extracted from the `authMiddleware`

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    res.status(200).json({ message: "User details fetched.", user });
  } catch (error) {
    res.status(500).json({ message: "Error fetching user details.", error });
  }
};
