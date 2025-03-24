import { Request, Response, NextFunction } from "express";
const API_KEY = String(process.env.API_KEY);

export const authAPI = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  const api_key = req.headers["x-api-key"];
  if (!api_key)
    return res.status(401).json({
      status: "fail",
      message: "You need an API key 🔑",
    });

  if (api_key !== API_KEY)
    return res.status(403).json({
      status: "fail",
      message: "Unauthorized API Key 🗝️",
    });

  next();
};
