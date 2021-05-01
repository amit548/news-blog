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
const http_errors_1 = __importDefault(require("http-errors"));
const jsonwebtoken_1 = require("jsonwebtoken");
const user_1 = require("../models/user");
const auth = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { token } = req.cookies;
    try {
        let errors = {};
        if (!token)
            errors.token = 'Token not found, please relogin';
        if (Object.keys(errors).length > 0)
            throw http_errors_1.default(401, { body: errors });
        const decodedToken = jsonwebtoken_1.verify(token, process.env.JWT_SECURITY || 'lol');
        if (!decodedToken)
            errors.token = 'Access token invalid, please relogin';
        if (Object.keys(errors).length > 0)
            throw http_errors_1.default(401, { body: errors });
        const { id } = decodedToken;
        const user = yield user_1.UserModel.findById(id);
        if (!user)
            errors.user = 'User not found';
        if (Object.keys(errors).length > 0)
            throw http_errors_1.default(401, { body: errors });
        res.locals.user = user;
        next();
    }
    catch (error) {
        if (error.name === 'JsonWebTokenError')
            error = http_errors_1.default(401, {
                body: { token: 'Access token invalid, please relogin' },
            });
        if (error.name === 'TokenExpiredError')
            error = http_errors_1.default(401, {
                body: { token: 'Access token expired, please relogin' },
            });
        if (error.name === 'NotBeforeError')
            error = http_errors_1.default(401, {
                body: { token: 'Token not active, please relogin' },
            });
        next(error);
    }
});
exports.default = auth;
//# sourceMappingURL=auth.js.map