"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const morgan_1 = __importDefault(require("morgan"));
const express_1 = __importDefault(require("express"));
const helmet_1 = __importDefault(require("helmet"));
const compression_1 = __importDefault(require("compression"));
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const db_1 = require("../User-Sign-Up/config/db");
const licenseRoutes_1 = require("../License-Plate/routes/licenseRoutes");
const RateLimit = (0, express_rate_limit_1.default)({
    windowMs: 15 * 60 * 1000,
    max: 100,
});
const app = (0, express_1.default)();
(0, db_1.connectDB)();
app.use((0, helmet_1.default)());
app.use((0, compression_1.default)());
app.use(express_1.default.json());
app.use((0, morgan_1.default)("dev"));
app.use(RateLimit);
app.use(licenseRoutes_1.router);
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
