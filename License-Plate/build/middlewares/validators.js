"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateLicensePlate = exports.validateVin = void 0;
const validateVin = (req, res, next) => {
    const vin = req.params.vin;
    const vinRegex = /^[A-HJ-NPR-Z0-9]{17}$/;
    if (!vinRegex.test(vin)) {
        return res.status(400).json({
            status: "failure",
            message: `vin: ${vin} is invalid`,
        });
    }
    next();
};
exports.validateVin = validateVin;
const validateLicensePlate = (req, res, next) => {
    const licensePlate = req.params.licensePlate;
    const licensePlateRegex = /^[A-Z]{4}[0-9]{3}$/;
    if (!licensePlateRegex.test(licensePlate)) {
        return res.status(400).json({
            status: "failure",
            message: `licensePlate: ${licensePlate} is invalid`,
        });
    }
    next();
};
exports.validateLicensePlate = validateLicensePlate;
