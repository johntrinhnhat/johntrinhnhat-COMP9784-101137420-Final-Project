import dotenv from "dotenv";
dotenv.config();
import express, { Request, Response, NextFunction } from "express";
import morgan from "morgan";
import helmet from "helmet";
import compression from "compression";
import { connectDB } from "./config/mongodb";
import { router } from "../License-Plate/routes/licenseRoutes";
import { RateLimit } from "./middlewares/rateLimit";
import { authAPI } from "./middlewares/authApi";

// APP AND DATABASE
const app = express();
connectDB();

//Middleware
app.use(express.json());
app.use(authAPI);
app.use(helmet());
app.use(compression());
app.use(RateLimit);
app.use(morgan("dev"));

app.use("/LP", router);

// app.use((err: Error, req: Request, res: Response, next: NextFunction): any => {
//   console.error(err.stack);
//   return res.status(500).json({
//     status: "error",
//     message: err.message || "Request timed out.",
//   });
// });

const PORT: number = process.env.PORT ? parseInt(process.env.PORT) : 3000;
app.listen(PORT, () => {
  console.log(`The server is running on port ${PORT} ...`);
  process.on("SIGTERM", shutdown);
  process.on("SIGINT", shutdown);
});

// Error handling middleware

function shutdown() {
  console.log(`The server is shutting down ...`);
  process.exit(1);
}
