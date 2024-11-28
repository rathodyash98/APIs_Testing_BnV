import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema({
  username: {
     type: String, 
     required: true, 
     unique: true 
    },
  email: { 
    type: String, 
    required: true, 
    unique: true  
    },
  password: {
    type: String, 
    required: true 
   },
  
});

// Hash password before saving
 userSchema.pre("save", async function(next) {
  const user = this;

  // only hash the password if it has been modified (or is new)
  if (!user.isModified("password")) return next();

  // generate a salt
  const salt = await bcrypt.genSalt(10);

  // hash the password using our new salt
  user.password = await bcrypt.hash(user.password, salt);

  next();
});

// Method to compare passwords
 userSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

const User = mongoose.model("User", userSchema);
export default User;
