import mongoose, { Schema, Document, HookNextFunction } from "mongoose";
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

// Hash password before saving
UserSchema.pre<IUser>("save", async function (next: HookNextFunction) {
  const user = this;

  // Only hash the password if it has been modified (or is new)
  if (!user.isModified("password")) return next();

  try {
    // Generate a salt
    const salt = await bcrypt.genSalt(10);

    // Hash the password using the salt
    user.password = await bcrypt.hash(user.password, salt);

    next();
  } catch (err) {
    next(err as Error);
  }
});

// Method to compare passwords
UserSchema.methods.comparePassword = async function (
  candidatePassword: string
): Promise<boolean> {
  return bcrypt.compare(candidatePassword, this.password);
};

// Create and export the User model
const User = mongoose.model<IUser>("User", UserSchema);
export default User;
