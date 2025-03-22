import dotenv from "dotenv";
dotenv.config();
import morgan from "morgan";
import express from "express";
import { connectDB } from "./config/db";
import { router } from "./routes/authRoutes";

const app = express();
connectDB();

app.use(express.json());
app.use(morgan("dev"));
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
