import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";

const MONGODB_URL: string = String(
  process.env.MONGODB_URL?.replace(
    "<db_password>",
    String(process.env.MONGODB_PASSWORD)
  )
);

export const connectDB = async () => {
  try {
    await mongoose.connect(MONGODB_URL);
    console.log("✅ MongoDB Connected Successfully");
  } catch (err) {
    console.log("❌ MongoDB Connection Failed:", err);
    process.exit(1);
  }
};
