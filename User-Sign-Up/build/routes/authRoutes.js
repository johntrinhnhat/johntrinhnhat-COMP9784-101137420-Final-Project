"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = __importDefault(require("express"));
const authControllers_1 = require("../controllers/authControllers");
exports.router = express_1.default.Router();
exports.router.put("/user/signup", authControllers_1.signup);
exports.router.get("/activate/:email/:activationToken", authControllers_1.activateAccount);
exports.router.get("/sendActivationToken/:email", authControllers_1.resendActivationToken);
