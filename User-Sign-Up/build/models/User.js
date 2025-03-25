"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const UserSchema = new mongoose_1.default.Schema({
    firstName: String,
    lastName: String,
    email: { type: String, unique: true },
    password: String,
    dateCreated: { type: Date, default: Date.now },
    emailVerified: { type: Boolean, default: false },
}, { collection: "Users" });
exports.User = mongoose_1.default.model("User", UserSchema);
