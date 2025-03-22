"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const LicenseSchema = new mongoose_1.default.Schema({
    licensePlate: {
        type: String,
        require: true,
        unique: true,
        match: /^[A-Z]{4}[0-9]{3}$/,
    },
    vin: {
        type: String,
        required: true,
        unique: true,
        match: /^[A-HJ-NPR-Z0-9]{17}$/,
    },
    dateCreated: {
        type: Date,
        default: Date.now,
    },
});
