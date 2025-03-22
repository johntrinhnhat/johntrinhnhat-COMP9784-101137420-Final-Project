import dotenv from "dotenv";
dotenv.config();
import morgan from "morgan";
import express from "express";
import helmet from "helmet";
import compression from "compression";
import rateLimit from "express-rate-limit";
import { connectDB } from "../User-Sign-Up/config/db";
import { router } from "../License-Plate/routes/licenseRoutes";

const RateLimit = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,
});

const app = express();
connectDB();

//Middleware
app.use(helmet());
app.use(compression());
app.use(express.json());
app.use(morgan("dev"));
app.use(RateLimit);
app.use(router);

const PORT: number = process.env.PORT ? parseInt(process.env.PORT) : 3000;
app.listen(PORT, () => {
  console.log(`The server is running on port ${PORT} ...`);
  process.on("SIGTERM", shutdown);
  process.on("SIGINT", shutdown);
});

function shutdown() {
  console.log(`The server is shutting down ...`);
  process.exit(1);
}
