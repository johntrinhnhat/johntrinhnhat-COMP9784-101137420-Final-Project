"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = __importDefault(require("express"));
const licenseControllers_1 = require("../controllers/licenseControllers");
const validators_1 = require("../middlewares/validators");
exports.router = express_1.default.Router();
exports.router.get("/", licenseControllers_1.getLP);
exports.router.get("/assigned", licenseControllers_1.getLPAssigned);
exports.router.get("/verify/:licensePlate", validators_1.validateLicensePlate, licenseControllers_1.verifyLP);
exports.router.put("/assign/:vin", validators_1.validateVin, licenseControllers_1.assignLP);
exports.router.post("/revoke/:vin", licenseControllers_1.revokeLP);
