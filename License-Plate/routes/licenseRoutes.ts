import express, { Request, Response } from "express";
import {
  assignLP,
  revokeLP,
  // verifyLP,
  getLP,
  getLPAssigned,
  verifyLP,
} from "../controllers/licenseControllers";
import { validateLicensePlate, validateVin } from "../middlewares/validators";

export const router = express.Router();

router.get("/", getLP);
router.get("/assigned", getLPAssigned);
router.get("/verify/:licensePlate", validateLicensePlate, verifyLP);
router.put("/assign/:vin", validateVin, assignLP);
router.post("/revoke/:vin", revokeLP);
