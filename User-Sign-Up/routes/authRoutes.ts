import express, { Request, Response } from "express";
import { signup, activateAccount, resendActivationToken } from "../controllers/authControllers";

export const router = express.Router();
    
router.put("/user/signup", signup);
router.get("/activate/:email/:activationToken", activateAccount);
router.get("/sendActivationToken/:email", resendActivationToken);