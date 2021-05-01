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
exports.singleUser = exports.updateListUser = exports.deleteListUser = exports.userList = exports.logout = exports.login = exports.register = void 0;
const bcrypt_1 = require("bcrypt");
const cookie_1 = require("cookie");
const express_validator_1 = require("express-validator");
const http_errors_1 = __importDefault(require("http-errors"));
const jsonwebtoken_1 = require("jsonwebtoken");
const mongoose_1 = require("mongoose");
const user_1 = require("../models/user");
const register = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { firstName, lastName, email, password } = req.body;
    try {
        let errors = {};
        const adminUser = res.locals.user;
        if (!adminUser)
            errors.admin = 'Please login as admin first';
        if (adminUser.role !== 'admin' || !adminUser.role)
            errors.admin =
                "Unfortunately it's not possible to add members to the database because you're not the admin";
        if (Object.keys(errors).length > 0)
            throw http_errors_1.default(403, { body: errors });
        const validationErrors = express_validator_1.validationResult(req);
        validationErrors.array().forEach((err) => {
            errors[err.param] = err.msg;
        });
        if (!validationErrors.isEmpty())
            throw http_errors_1.default(406, { body: errors });
        const user = new user_1.UserModel({
            firstName,
            lastName,
            email,
            password,
        });
        adminUser.createdUsers.push(user.id);
        yield adminUser.save();
        yield user.save();
        res.status(201).json(user);
    }
    catch (error) {
        next(error);
    }
});
exports.register = register;
const login = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        let errors = {};
        const validationErrors = express_validator_1.validationResult(req);
        validationErrors.array().forEach((err) => {
            errors[err.param] = err.msg;
        });
        if (!validationErrors.isEmpty())
            throw http_errors_1.default(406, { body: errors });
        const user = yield user_1.UserModel.findOne({ email });
        if (!user)
            errors.email = `${email} - not exists`;
        if (Object.keys(errors).length > 0)
            throw http_errors_1.default(401, { body: errors });
        const isPasswordMatched = yield bcrypt_1.compare(password, user.password);
        if (!isPasswordMatched)
            errors.password = 'Password not matched';
        if (Object.keys(errors).length > 0)
            throw http_errors_1.default(401, { body: errors });
        const token = jsonwebtoken_1.sign({ id: user.id }, process.env.JWT_SECURITY || 'lol');
        res.set('Set-Cookie', cookie_1.serialize('token', token, {
            secure: process.env.NODE_ENV === 'production',
            httpOnly: true,
            path: '/',
            sameSite: 'strict',
        }));
        res.status(200).json(user);
    }
    catch (error) {
        next(error);
    }
});
exports.login = login;
const logout = (_, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.set('Set-Cookie', cookie_1.serialize('token', '', {
            secure: process.env.NODE_ENV === 'production',
            httpOnly: true,
            path: '/',
            sameSite: 'strict',
        }));
        res.status(200).json({ success: true });
    }
    catch (error) {
        next(error);
    }
});
exports.logout = logout;
const userList = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const adminUser = res.locals.user;
    const currentPage = parseInt(req.query.page) || 1;
    const userPerPage = parseInt(req.query.limit) || 30;
    try {
        let errors = {};
        if (!adminUser)
            errors.admin = 'Please login as admin first';
        if (adminUser.role !== 'admin')
            errors.admin =
                "Unfortunately it's not possible to show all members because you're not the admin";
        if (Object.keys(errors).length > 0)
            throw http_errors_1.default(403, { body: errors });
        const usersDocCount = yield user_1.UserModel.find({
            role: 'user',
        }).countDocuments();
        const users = yield user_1.UserModel.find({ role: 'user' })
            .skip((currentPage - 1) * userPerPage)
            .limit(userPerPage)
            .exec();
        res.status(200).json({ totalUsers: usersDocCount, users });
    }
    catch (error) {
        next(error);
    }
});
exports.userList = userList;
const singleUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const adminUser = res.locals.user;
    try {
        let errors = {};
        if (!adminUser)
            errors.admin = 'Please login as admin first';
        if (adminUser.role !== 'admin')
            errors.admin =
                "Unfortunately it's not possible to show all members because you're not the admin";
        if (!mongoose_1.isValidObjectId(req.params.id))
            errors.id = 'Id Not valid';
        if (Object.keys(errors).length > 0)
            throw http_errors_1.default(403, { body: errors });
        const user = yield user_1.UserModel.findById(req.params.id).exec();
        res.status(200).json(user);
    }
    catch (error) {
        next(error);
    }
});
exports.singleUser = singleUser;
const deleteListUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const adminUser = res.locals.user;
    try {
        let errors = {};
        if (!adminUser)
            errors.admin = 'Please login as admin first';
        if (adminUser.role !== 'admin')
            errors.admin =
                "Unfortunately it's not possible to delete any members because you're not the admin";
        if (Object.keys(errors).length > 0)
            throw http_errors_1.default(403, { body: errors });
        const { id } = req.params;
        if (!mongoose_1.isValidObjectId(id))
            errors.id = 'User ID not valid';
        if (Object.keys(errors).length > 0)
            throw http_errors_1.default(406, { body: errors });
        if (adminUser.id.toString() === id)
            errors.admin = 'Self delete not possible';
        if (Object.keys(errors).length > 0)
            throw http_errors_1.default(405, { body: errors });
        const currentUser = yield user_1.UserModel.findById(id);
        if (!currentUser)
            errors.user = 'User not found';
        if (Object.keys(errors).length > 0)
            throw http_errors_1.default(406, { body: errors });
        yield (currentUser === null || currentUser === void 0 ? void 0 : currentUser.remove());
        adminUser.createdUsers = adminUser.createdUsers.pull(id);
        yield adminUser.save();
        res.status(200).json({ success: true });
    }
    catch (error) {
        next(error);
    }
});
exports.deleteListUser = deleteListUser;
const updateListUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const adminUser = res.locals.user;
    const { firstName, lastName, email, password } = req.body;
    try {
        let errors = {};
        if (!adminUser)
            errors.admin = 'Please login as admin first';
        if (adminUser.role !== 'admin')
            errors.admin =
                "Unfortunately it's not possible to update any members because you're not the admin";
        if (Object.keys(errors).length > 0)
            throw http_errors_1.default(403, { body: errors });
        const { id } = req.params;
        if (!mongoose_1.isValidObjectId(id))
            errors.id = 'User ID not valid';
        if (Object.keys(errors).length > 0)
            throw http_errors_1.default(406, { body: errors });
        const validationErrors = express_validator_1.validationResult(req);
        validationErrors.array().forEach((err) => {
            errors[err.param] = err.msg;
        });
        if (!validationErrors.isEmpty())
            throw http_errors_1.default(406, { body: errors });
        const updateUser = yield user_1.UserModel.findById(id);
        if (!updateUser)
            errors.user = 'User not found';
        if (Object.keys(errors).length > 0)
            throw http_errors_1.default(406, { body: errors });
        if (firstName)
            updateUser.firstName = firstName;
        if (lastName)
            updateUser.lastName = lastName;
        if (email)
            updateUser.email = email;
        if (password)
            updateUser.password = yield bcrypt_1.hash(password, 12);
        const updatedUserData = yield (updateUser === null || updateUser === void 0 ? void 0 : updateUser.save());
        res.status(201).json(updatedUserData);
    }
    catch (error) {
        next(error);
    }
});
exports.updateListUser = updateListUser;
//# sourceMappingURL=user.js.map