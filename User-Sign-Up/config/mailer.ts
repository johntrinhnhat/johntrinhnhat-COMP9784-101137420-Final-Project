import nodemailer from "nodemailer";

export const sendEmail = async (
  email: string,
  activationLink: string
): Promise<any> => {
  let transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: email,
    subject: "activate your account",
    text: `Click the link to activate ${activationLink}`,
  });
};
