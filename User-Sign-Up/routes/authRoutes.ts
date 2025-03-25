import express, { Request, Response } from "express";
import { signup, activateAccount, resendActivationToken, getUsers } from "../controllers/authControllers";

export const router = express.Router();


router.get("/users", getUsers)
router.put("/user/signup", signup);
router.get("/user/activate/:email/:activationToken", activateAccount);
router.get("/user/sendActivationToken/:email", resendActivationToken);