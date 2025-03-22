import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "../models/User";
import { sendEmail } from "../config/mailer";

export const signup = async (req: Request, res: Response): Promise<any> => {
  try {
    const { firstName, lastName, email, password } = req.body;

    // Check if user already exists
    let user = await User.findOne({ email });
    if (user)
      return res
        .status(400)
        .json({ status: "fail", message: "User already exists" });

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    user = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });

    await user.save();

    // Generate activation token
    const activationToken = jwt.sign(
      { email },
      String(process.env.JWT_SECRET),
      {
        expiresIn: "1h",
      }
    );
    console.log(activationToken);
    const activationLink = `${process.env.SERVER_URL}/user/activate/${email}/${activationToken}`;

    // Send activation email
    await sendEmail(email, activationLink);

    res.status(201).json({
      message:
        "User registered. Please check your email to activate your account.",
    });
  } catch (error) {
    console.error("Error during signup:", error);

    res.status(500).json({ msg: "Server error" });
  }
};

export const activateAccount = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const { email, activationToken } = req.params;

    // Verify token
    const decoded = jwt.verify(
      activationToken,
      String(process.env.JWT_SECRET)
    ) as jwt.JwtPayload;
    console.log(decoded);
    if (decoded.email !== email)
      return res.status(400).json({ msg: "Invalid token" });

    // Update user
    await User.findOneAndUpdate({ email }, { emailVerified: true });

    res.json({ msg: "Email verified successfully" });
  } catch (error) {
    res.status(500).json({ msg: "Invalid or expired token" });
  }
};

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

    const activationToken = jwt.sign(
      { email },
      String(process.env.JWT_SECRET),
      { expiresIn: "1h" }
    );
    const activationLink = `${process.env.SERVER_URL}/user/activate/${email}/${activationToken}`;

    await sendEmail(email, activationLink);

    res.json({ message: "Activation link sent!" });
  } catch (error) {
    res.status(500).json({ error: "Error sending activation link." });
  }
};
