import mongoose, { Schema, Document } from "mongoose";
import bcrypt from "bcryptjs";

// Define an interface for the User document
export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  comparePassword(candidatePassword: string): Promise<boolean>;
}

// Define the User schema
const UserSchema: Schema<IUser> = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

// Hash password before saving using a better approach
UserSchema.pre<IUser>("save", async function (next) {
  const user = this;

  // Only hash the password if it's new or modified
  if (!user.isModified("password")) return next();

  try {
    // Generate salt with a cost factor of 10
    const salt = await bcrypt.genSalt(10);

    // Hash the password with the generated salt
    const hashedPassword = await bcrypt.hash(user.password, salt);
    user.password = hashedPassword; // Assign hashed password to the user

    next(); // Proceed with saving the user
  } catch (error) {
    next(error); // Pass the error to the next middleware
  }
});

// Method to compare passwords
UserSchema.methods.comparePassword = async function (
  candidatePassword: string
): Promise<boolean> {
  // Compare the candidate password with the stored hashed password
  return bcrypt.compare(candidatePassword, this.password);
};

// Create and export the User model
const User = mongoose.model<IUser>("User", UserSchema);
export default User;
