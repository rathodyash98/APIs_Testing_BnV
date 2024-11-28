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
