"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const helmet_1 = __importDefault(require("helmet"));
const compression_1 = __importDefault(require("compression"));
const mongodb_1 = require("./config/mongodb");
const licenseRoutes_1 = require("../License-Plate/routes/licenseRoutes");
const rateLimit_1 = require("./middlewares/rateLimit");
const authApi_1 = require("./middlewares/authApi");
const app = (0, express_1.default)();
(0, mongodb_1.connectDB)();
app.use(express_1.default.json());
app.use(authApi_1.authAPI);
app.use((0, helmet_1.default)());
app.use((0, compression_1.default)());
app.use(rateLimit_1.RateLimit);
app.use((0, morgan_1.default)("dev"));
app.use("/licensePlates", licenseRoutes_1.router);
const PORT = process.env.PORT ? parseInt(process.env.PORT) : 3000;
app.listen(PORT, () => {
    console.log(`The server is running on port ${PORT} ...`);
    process.on("SIGTERM", shutdown);
    process.on("SIGINT", shutdown);
});
function shutdown() {
    console.log(`The server is shutting down ...`);
    process.exit(1);
}
