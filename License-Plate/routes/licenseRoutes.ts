import express from "express";
import { assignLP, revokeLP, verifyLP } from "../controllers/licenseControllers";

export const router = express.Router();

router.put("/licensePlates/assign/:vin", assignLP);
router.put("/licensePlates/revoke/:vin", revokeLP);
router.put("/licensePlates/verify/:vin", verifyLP);
