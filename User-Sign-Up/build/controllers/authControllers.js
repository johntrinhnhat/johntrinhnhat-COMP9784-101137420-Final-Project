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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resendActivationToken = exports.activateAccount = exports.signup = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_1 = require("../models/User");
const mailer_1 = require("../config/mailer");
const signup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { firstName, lastName, email, password } = req.body;
        let user = yield User_1.User.findOne({ email });
        if (user)
            return res
                .status(400)
                .json({ status: "fail", message: "User already exists" });
        const hashedPassword = yield bcrypt_1.default.hash(password, 10);
        user = new User_1.User({
            firstName,
            lastName,
            email,
            password: hashedPassword,
        });
        yield user.save();
        const activationToken = jsonwebtoken_1.default.sign({ email }, String(process.env.JWT_SECRET), {
            expiresIn: "1h",
        });
        console.log(activationToken);
        const activationLink = `${process.env.SERVER_URL}/user/activate/${email}/${activationToken}`;
        yield (0, mailer_1.sendEmail)(email, activationLink);
        res.status(201).json({
            message: "User registered. Please check your email to activate your account.",
        });
    }
    catch (error) {
        console.error("Error during signup:", error);
        res.status(500).json({ msg: "Server error" });
    }
});
exports.signup = signup;
const activateAccount = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, activationToken } = req.params;
        const decoded = jsonwebtoken_1.default.verify(activationToken, String(process.env.JWT_SECRET));
        console.log(decoded);
        if (decoded.email !== email)
            return res.status(400).json({ msg: "Invalid token" });
        yield User_1.User.findOneAndUpdate({ email }, { emailVerified: true });
        res.json({ msg: "Email verified successfully" });
    }
    catch (error) {
        res.status(500).json({ msg: "Invalid or expired token" });
    }
});
exports.activateAccount = activateAccount;
const resendActivationToken = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email } = req.params;
        const user = yield User_1.User.findOne({ email });
        if (!user)
            return res.status(404).json({ error: "User not found." });
        if (user.emailVerified)
            return res.json({ message: "Email already verified." });
        const activationToken = jsonwebtoken_1.default.sign({ email }, String(process.env.JWT_SECRET), { expiresIn: "1h" });
        const activationLink = `${process.env.SERVER_URL}/user/activate/${email}/${activationToken}`;
        yield (0, mailer_1.sendEmail)(email, activationLink);
        res.json({ message: "Activation link sent!" });
    }
    catch (error) {
        res.status(500).json({ error: "Error sending activation link." });
    }
});
exports.resendActivationToken = resendActivationToken;
