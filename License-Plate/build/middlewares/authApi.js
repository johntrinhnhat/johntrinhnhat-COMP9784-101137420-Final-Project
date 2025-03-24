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
exports.authAPI = void 0;
const API_KEY = String(process.env.API_KEY);
const authAPI = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const api_key = req.headers["x-api-key"];
    if (!api_key)
        return res.status(401).json({
            status: "fail",
            message: "You need an API key 🔑",
        });
    if (api_key !== API_KEY)
        return res.status(403).json({
            status: "fail",
            message: "Unauthorized API Key 🗝️",
        });
    next();
});
exports.authAPI = authAPI;
