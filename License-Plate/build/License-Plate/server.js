"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const morgan_1 = __importDefault(require("morgan"));
const express_1 = __importDefault(require("express"));
const db_1 = require("../User-Sign-Up/config/db");
const app = (0, express_1.default)();
(0, db_1.connectDB)();
app.use(express_1.default.json());
app.use((0, morgan_1.default)("dev"));
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
