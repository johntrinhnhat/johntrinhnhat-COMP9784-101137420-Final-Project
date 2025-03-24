// File: middleware/validators.js
import { Request, Response, NextFunction } from "express";

export const validateVin = (
  req: Request,
  res: Response,
  next: NextFunction
): any => {
  const vin = req.params.vin;

  // VIN validation: 17 alphanumeric chars, excluding I, O, Q
  const vinRegex = /^[A-HJ-NPR-Z0-9]{17}$/;

  if (!vinRegex.test(vin)) {
    return res.status(400).json({
      status: "failure",
      message: `vin: ${vin} is invalid`,
    });
  }

  next();
};

export const validateLicensePlate = (
  req: Request,
  res: Response,
  next: NextFunction
): any => {
  const licensePlate = req.params.licensePlate;

  // License plate validation: 4 uppercase letters followed by 3 numbers
  const licensePlateRegex = /^[A-Z]{4}[0-9]{3}$/;

  if (!licensePlateRegex.test(licensePlate)) {
    return res.status(400).json({
      status: "failure",
      message: `licensePlate: ${licensePlate} is invalid`,
    });
  }

  next();
};
