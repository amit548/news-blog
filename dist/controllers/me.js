"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_errors_1 = __importDefault(require("http-errors"));
const me = (_, res, next) => {
    const { user } = res.locals;
    try {
        let errors = {};
        if (!user)
            errors.user = 'User not found';
        if (Object.keys(errors).length > 0)
            throw http_errors_1.default(401, { body: errors });
        res.status(200).json(user);
    }
    catch (error) {
        next(error);
    }
};
exports.default = me;
//# sourceMappingURL=me.js.map