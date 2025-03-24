"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LPAssigned = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const LPAssignedSchema = new mongoose_1.default.Schema({
    licensePlate: {
        type: String,
        require: true,
        unique: true,
    },
    vin: {
        type: String,
        required: true,
        unique: true,
    },
    dateCreated: {
        type: Date,
        default: Date.now,
    },
}, { collection: "License-Assigned" });
exports.LPAssigned = mongoose_1.default.model("LPAssigned", LPAssignedSchema);
