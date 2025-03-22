import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: { type: String, unique: true },
  password: String,
  dateCreated: { type: Date, default: Date.now },
  emailVerified: { type: Boolean, default: false },
});

export const User = mongoose.model("User", UserSchema);
