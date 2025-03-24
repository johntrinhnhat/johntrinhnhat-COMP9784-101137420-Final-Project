"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyLP = exports.revokeLP = exports.assignLP = exports.getLPAssigned = exports.getLP = void 0;
const License_1 = require("../models/License");
const LicenseAssigned_1 = require("../models/LicenseAssigned");
const getLP = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const LicensePlate = yield License_1.LP.find({});
        console.log("License Plates:", LicensePlate);
        if (LicensePlate.length === 0) {
            return res.status(404).json({
                status: "fail",
                message: "Could not find any license plates.",
            });
        }
        return res.status(200).json({
            status: "success",
            total: LicensePlate.length,
            available: LicensePlate.filter((lp) => lp.status === "available")
                .length,
            assigned: LicensePlate.filter((lp) => lp.status === "assigned")
                .length,
            revoked: LicensePlate.filter((lp) => lp.status === "revoked").length,
            data: LicensePlate,
        });
    }
    catch (err) {
        console.error("Error fetching license plates:", err);
        return res.status(500).json({
            status: "error",
            message: "Something went wrong while fetching license plates.",
        });
    }
});
exports.getLP = getLP;
const getLPAssigned = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const LPassigned = yield LicenseAssigned_1.LPAssigned.find();
        if (LPassigned.length === 0) {
            return res.status(404).json({
                status: "fail",
                message: "Could not find any license plates.",
            });
        }
        return res.status(200).json({
            status: "success",
            total: LPassigned.length,
            data: LPassigned,
        });
    }
    catch (err) {
        return res.status(500).json({
            status: "error",
            message: "Error while fetching license plates assigned",
        });
    }
});
exports.getLPAssigned = getLPAssigned;
const assignLP = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { vin } = req.params;
        let existingLP = yield LicenseAssigned_1.LPAssigned.findOne({ vin });
        if (existingLP) {
            return res.status(200).json({
                status: "success",
                message: `licensePlate: ${existingLP.licensePlate} has already been assigned to vin: ${vin}.`,
            });
        }
        let nextAvailableLP = yield License_1.LP.findOneAndUpdate({ status: "available" }, { status: "assigned" }, { new: true });
        if (!nextAvailableLP) {
            return res.status(404).json({
                status: "fail",
                message: "No available license plates to assign.",
            });
        }
        const newLPAssign = new LicenseAssigned_1.LPAssigned({
            licensePlate: nextAvailableLP.licensePlate,
            vin,
        });
        yield newLPAssign.save();
        return res.status(200).json({
            status: "success",
            message: `licensePlate: ${nextAvailableLP.licensePlate} is assigned to vin: ${vin}.`,
        });
    }
    catch (error) {
        console.error("Error assigning license plate:", error);
        return res.status(500).json({
            status: "error",
            message: "Request timed out.",
        });
    }
});
exports.assignLP = assignLP;
const revokeLP = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { vin } = req.params;
        const existingLP = yield LicenseAssigned_1.LPAssigned.findOne({ vin: vin });
        if (existingLP) {
            const updatedLP = yield License_1.LP.findOneAndUpdate({ licensePlate: existingLP.licensePlate }, { status: "revoked" }, { new: true });
            yield LicenseAssigned_1.LPAssigned.findOneAndDelete({ vin: vin });
            return res.status(200).json({
                status: "success",
                message: `licensePlate: ${existingLP.licensePlate} was revoked from vin: ${vin}.`,
            });
        }
        return res.status(404).json({
            status: "fail",
            message: `No license plate is associated with vin: ${vin}`,
        });
    }
    catch (error) {
        console.error("Error revoking license plate:", error);
        return res.status(500).json({
            status: "error",
            message: "Request timed out.",
        });
    }
});
exports.revokeLP = revokeLP;
const verifyLP = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const licensePlate = req.params.licensePlate;
        console.log(licensePlate);
        const existingLP = yield LicenseAssigned_1.LPAssigned.findOne({ licensePlate: licensePlate });
        if (!existingLP) {
            return res.status(200).json({
                status: "success",
                message: `license plate: ${licensePlate} is not assigned. `,
            });
        }
        return res.status(200).json({
            status: "success",
            message: `licensePlate: ${existingLP.licensePlate} is assigned to vin: ${existingLP.vin}.`,
        });
    }
    catch (err) {
        console.error("Error", err);
        return res.status(500).json({
            status: "error",
            message: "Request timed out.",
        });
    }
});
exports.verifyLP = verifyLP;
