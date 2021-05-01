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
const jsonwebtoken_1 = require("jsonwebtoken");
const http_errors_1 = __importDefault(require("http-errors"));
const user_1 = require("../models/user");
const notAuth = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { token } = req.cookies;
    try {
        let errors = {};
        if (!token)
            return next();
        const { id } = jsonwebtoken_1.verify(token, process.env.JWT_SECURITY || 'lol');
        if (!id)
            return next();
        const user = yield user_1.UserModel.findById(id);
        if (user)
            errors.login = 'You already logged in';
        if (Object.keys(errors).length > 0)
            throw http_errors_1.default(403, { body: errors });
        next();
    }
    catch (error) {
        if (error.name === 'JsonWebTokenError' ||
            error.name === 'TokenExpiredError' ||
            error.name === 'NotBeforeError')
            next();
        next(error);
    }
});
exports.default = notAuth;
//# sourceMappingURL=not-auth.js.map