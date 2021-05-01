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
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const user_1 = require("../models/user");
const user_2 = require("../controllers/user");
const auth_1 = __importDefault(require("../middlewares/auth"));
const not_auth_1 = __importDefault(require("../middlewares/not-auth"));
const router = express_1.Router();
router.post('/register', [
    express_validator_1.body('firstName')
        .isLength({ min: 3 })
        .withMessage('First name must be 3 chars long')
        .notEmpty()
        .withMessage('First name is required'),
    express_validator_1.body('lastName')
        .isLength({ min: 3 })
        .withMessage('Last name must be 3 chars long')
        .notEmpty()
        .withMessage('Last name is required'),
    express_validator_1.body('email')
        .notEmpty()
        .withMessage('E-mail is required')
        .isEmail()
        .withMessage('Please enter an valid E-mail address')
        .custom((value) => __awaiter(void 0, void 0, void 0, function* () {
        const user = yield user_1.UserModel.findOne({ email: value });
        if (user)
            return Promise.reject(`${value} - already in use`);
    }))
        .normalizeEmail(),
    express_validator_1.body('password')
        .custom((value, { req }) => {
        if (value !== req.body.confirmPassword)
            throw new Error('Password confirmation does not match password');
        return true;
    })
        .isLength({ min: 6 })
        .withMessage('The password must be 6+ chars long')
        .notEmpty()
        .withMessage('Password is required'),
], auth_1.default, user_2.register);
router.post('/login', [
    express_validator_1.body('email')
        .notEmpty()
        .withMessage('E-mail is required')
        .isEmail()
        .withMessage('Please enter an valid E-mail address')
        .normalizeEmail(),
    express_validator_1.body('password')
        .isLength({ min: 6 })
        .withMessage('The password must be 6+ chars long')
        .notEmpty()
        .withMessage('Password is required'),
], not_auth_1.default, user_2.login);
router.post('/logout', auth_1.default, user_2.logout);
router.get('/list', auth_1.default, user_2.userList);
router.get('/list/:id', auth_1.default, user_2.singleUser);
router.delete('/list/:id', auth_1.default, user_2.deleteListUser);
router.put('/list/:id', [
    express_validator_1.body('firstName')
        .isLength({ min: 3 })
        .withMessage('First name must be 3 chars long')
        .notEmpty()
        .withMessage('First name is required')
        .optional({ nullable: true, checkFalsy: true }),
    express_validator_1.body('lastName')
        .isLength({ min: 3 })
        .withMessage('Last name must be 3 chars long')
        .notEmpty()
        .withMessage('Last name is required')
        .optional({ nullable: true, checkFalsy: true }),
    express_validator_1.body('email')
        .notEmpty()
        .withMessage('E-mail is required')
        .isEmail()
        .withMessage('Please enter an valid E-mail address')
        .custom((value, { req }) => __awaiter(void 0, void 0, void 0, function* () {
        const user = yield user_1.UserModel.findById(req.params.id);
        const emailUser = yield user_1.UserModel.findOne({ email: value });
        if ((emailUser === null || emailUser === void 0 ? void 0 : emailUser.id) !== (user === null || user === void 0 ? void 0 : user.id) && emailUser)
            return Promise.reject(`${value} - already in use`);
    }))
        .normalizeEmail()
        .optional({ nullable: true, checkFalsy: true }),
    express_validator_1.body('password')
        .custom((value, { req }) => {
        if (value !== req.body.confirmPassword)
            throw new Error('Password confirmation does not match password');
        return true;
    })
        .isLength({ min: 6 })
        .withMessage('The password must be 6+ chars long')
        .notEmpty()
        .withMessage('Password is required')
        .optional({ nullable: true, checkFalsy: true }),
], auth_1.default, user_2.updateListUser);
exports.default = router;
//# sourceMappingURL=user.js.map