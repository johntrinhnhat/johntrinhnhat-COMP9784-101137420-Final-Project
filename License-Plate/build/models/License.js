"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LP = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const LPSchema = new mongoose_1.default.Schema({
    licensePlate: {
        type: String,
        required: true,
        unique: true,
    },
    status: {
        type: String,
        required: true,
        enum: ["available", "revoked", "assigned"],
        default: "available",
    },
    dateCreated: {
        type: Date,
        default: Date.now,
        immutable: true,
    },
}, { collection: "License" });
exports.LP = mongoose_1.default.model("LP", LPSchema);
