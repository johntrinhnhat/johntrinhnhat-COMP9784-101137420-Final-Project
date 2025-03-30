import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "../models/User";
import { sendEmail } from "../config/mailer";

// Fetch users with pagination, sorting, and filtering
export const getUsers = async (req: Request, res: Response): Promise<any> => {
  const page: number = parseInt(req.query.page as string) || 1;
  const limit: number = parseInt(req.query.limit as string) || 5;
  const skip: number = (page - 1) * limit;
  const sortBy: string = (req.query.sortBy as string) || "createdAt";

  // Extract query parameters excluding pagination and sorting fields
  const queryObj = { ...req.query };
  const excludedFields = ["page", "limit", "sortBy"];
  excludedFields.forEach((el) => delete queryObj[el]);

  // Convert query operators to MongoDB format
  let queryStr = JSON.stringify(queryObj);
  queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);

  try {
    const users = await User.find(JSON.parse(queryStr))
      .limit(limit)
      .skip(skip)
      .sort(sortBy);

    if (users.length === 0)
      return res
        .status(404)
        .json({ status: "fail", message: "No users found!" });

    return res.status(200).json({
      status: "success",
      totalPage: Math.ceil((await User.countDocuments()) / limit),
      currentPage: page,
      totalData: users.length,
      data: users,
    });
  } catch (err) {
    return res
      .status(500)
      .json({ status: "error", message: "Request time out!" });
  }
};

// User registration with email verification
export const signup = async (req: Request, res: Response): Promise<any> => {
  try {
    const { firstName, lastName, email, password } = req.body;

    // Check if user already exists
    let user = await User.findOne({ email });
    if (user)
      return res
        .status(400)
        .json({ status: "fail", message: "User already exists" });

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user instance
    user = new User({ firstName, lastName, email, password: hashedPassword });
    await user.save();

    // Generate an activation token valid for 1 hour
    const activationToken = jwt.sign(
      { email },
      String(process.env.JWT_SECRET),
      { expiresIn: "1h" }
    );
    const activationLink = `${process.env.SERVER_URL}/user/activate/${email}/${activationToken}`;

    // Send activation email
    await sendEmail(email, activationLink);

    res
      .status(201)
      .json({
        message:
          "User registered. Please check your email to activate your account.",
      });
  } catch (error) {
    console.error("Error during signup:", error);
    res.status(500).json({ msg: "Server error" });
  }
};

// Activate user account via email verification
export const activateAccount = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const { email, activationToken } = req.params;

    // Verify activation token
    const decoded = jwt.verify(
      activationToken,
      String(process.env.JWT_SECRET)
    ) as jwt.JwtPayload;
    if (decoded.email !== email)
      return res.status(400).json({ msg: "Invalid token" });

    // Update user record to mark email as verified
    await User.findOneAndUpdate({ email }, { emailVerified: true });

    res.json({ msg: "Email verified successfully" });
  } catch (error) {
    res.status(500).json({ msg: "Invalid or expired token" });
  }
};

// Resend activation email if not verified
export const resendActivationToken = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const { email } = req.params;
    const user = await User.findOne({ email });

    if (!user) return res.status(404).json({ error: "User not found." });
    if (user.emailVerified)
      return res.json({ message: "Email already verified." });

    // Generate a new activation token
    const activationToken = jwt.sign(
      { email },
      String(process.env.JWT_SECRET),
      { expiresIn: "1h" }
    );
    const activationLink = `${process.env.SERVER_URL}/user/activate/${email}/${activationToken}`;

    // Send activation email
    await sendEmail(email, activationLink);

    res.json({
      message: "Activation link sent!",
      activationToken: activationToken,
    });
  } catch (error) {
    res.status(500).json({ error: "Error sending activation link." });
  }
};
