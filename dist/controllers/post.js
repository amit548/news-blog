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
exports.getVideoList = exports.deleteImageFormPost = exports.getPostsByCategory = exports.getPostsForAdmin = exports.deletePost = exports.updatePost = exports.getPosts = exports.getPost = exports.createPost = void 0;
const express_validator_1 = require("express-validator");
const http_errors_1 = __importDefault(require("http-errors"));
const mongoose_1 = require("mongoose");
const path_1 = require("path");
const post_1 = require("../models/post");
const user_1 = require("../models/user");
const util_1 = require("../utils/util");
const createPost = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let { title, description, category, private: isPrivate, videoUrl } = req.body;
    const user = res.locals.user;
    try {
        let errors = {};
        const validationErrors = express_validator_1.validationResult(req);
        validationErrors.array().forEach((err) => {
            errors[err.param] = err.msg;
        });
        if (!validationErrors.isEmpty())
            throw http_errors_1.default(406, { body: errors });
        if (!user)
            errors.user = 'You are not a creator';
        if (Object.keys(errors).length > 0)
            throw http_errors_1.default(403, { body: errors });
        if (user.role === 'user')
            isPrivate = true;
        const newPost = {
            title,
            description,
            category,
            creator: user.id,
            private: isPrivate,
            videoUrl,
        };
        if (req.files) {
            if (req.files.thumbnailImage) {
                if (req.files.thumbnailImage.mimetype === 'image/jpeg' ||
                    req.files.thumbnailImage.mimetype === 'image/png') {
                    const fileName = util_1.makeId(8) + '-' + req.files.thumbnailImage.name;
                    newPost.thumbnailImage = fileName;
                    req.files.thumbnailImage.mv(path_1.join(__dirname, '../../public/images/' + fileName));
                }
                else {
                    errors.thumbnailImage = 'Only jpeg, jpg & png accepted';
                }
            }
            else {
                errors.thumbnailImage = 'Thumbnail image required';
            }
        }
        else {
            errors.thumbnailImage = 'Thumbnail image required';
        }
        if (req.files) {
            if (req.files.image1) {
                if (req.files.image1.mimetype === 'image/jpeg' ||
                    req.files.image1.mimetype === 'image/png') {
                    const fileName = util_1.makeId(8) + '-' + req.files.image1.name;
                    newPost.image1 = fileName;
                    req.files.image1.mv(path_1.join(__dirname, '../../public/images/' + fileName));
                }
                else {
                    errors.image1 = 'Only jpeg, jpg & png accepted';
                }
            }
            if (req.files.image2) {
                if (req.files.image2.mimetype === 'image/jpeg' ||
                    req.files.image2.mimetype === 'image/png') {
                    const fileName = util_1.makeId(8) + '-' + req.files.image2.name;
                    newPost.image2 = fileName;
                    req.files.image2.mv(path_1.join(__dirname, '../../public/images/' + fileName));
                }
                else {
                    errors.image2 = 'Only jpeg, jpg & png accepted';
                }
            }
            if (req.files.image3) {
                if (req.files.image3.mimetype === 'image/jpeg' ||
                    req.files.image3.mimetype === 'image/png') {
                    const fileName = util_1.makeId(8) + '-' + req.files.image3.name;
                    newPost.image3 = fileName;
                    req.files.image3.mv(path_1.join(__dirname, '../../public/images/' + fileName));
                }
                else {
                    errors.image3 = 'Only jpeg, jpg & png accepted';
                }
            }
            if (req.files.image4) {
                if (req.files.image4.mimetype === 'image/jpeg' ||
                    req.files.image4.mimetype === 'image/png') {
                    const fileName = util_1.makeId(8) + '-' + req.files.image4.name;
                    newPost.image4 = fileName;
                    req.files.image4.mv(path_1.join(__dirname, '../../public/images/' + fileName));
                }
                else {
                    errors.image4 = 'Only jpeg, jpg & png accepted';
                }
            }
        }
        if (Object.keys(errors).length > 0)
            throw http_errors_1.default(403, { body: errors });
        const post = new post_1.PostModel(Object.assign({}, newPost));
        yield post.save();
        user.createdPosts.push(post.id);
        yield user.save();
        res.status(201).json(post);
    }
    catch (error) {
        next(error);
    }
});
exports.createPost = createPost;
const getPosts = (_, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const posts = yield post_1.PostModel.find({ private: false })
            .sort({ createdAt: -1 })
            .populate('creator')
            .exec();
        res.status(200).json(posts);
    }
    catch (error) {
        next(error);
    }
});
exports.getPosts = getPosts;
const getPostsByCategory = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const category = req.query.category || 'সরকারি চাকরি';
        const postsPerPage = parseInt(req.query.limit) || 6;
        const currentPage = parseInt(req.query.page) || 1;
        const totalPosts = yield post_1.PostModel.find({
            private: false,
            category,
        }).countDocuments();
        const posts = yield post_1.PostModel.find({
            private: false,
            category,
        })
            .skip((currentPage - 1) * postsPerPage)
            .limit(postsPerPage)
            .sort({ createdAt: -1 })
            .exec();
        res.status(200).json({ totalPosts, posts });
    }
    catch (error) {
        next(error);
    }
});
exports.getPostsByCategory = getPostsByCategory;
const getPostsForAdmin = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const user = res.locals.user;
    const currentPage = parseInt(req.query.page) || 1;
    const postsPerPage = parseInt(req.query.limit) || 30;
    try {
        let adminConfig = {};
        if (user.role !== 'admin') {
            adminConfig.creator = user.id;
        }
        const postsDocCount = yield post_1.PostModel.find(adminConfig).countDocuments();
        const posts = yield post_1.PostModel.find(adminConfig)
            .skip((currentPage - 1) * postsPerPage)
            .limit(postsPerPage)
            .sort({ createdAt: -1 })
            .populate('creator')
            .exec();
        res.status(200).json({ totalPosts: postsDocCount, posts });
    }
    catch (error) {
        next(error);
    }
});
exports.getPostsForAdmin = getPostsForAdmin;
const getPost = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        let errors = {};
        if (!mongoose_1.isValidObjectId(id))
            errors.id = 'Post identification not valid';
        if (Object.keys(errors).length > 0)
            throw http_errors_1.default(400, { body: errors });
        const post = yield post_1.PostModel.findById(id);
        if (!post)
            errors.post = 'Post not found';
        if (Object.keys(errors).length > 0)
            throw http_errors_1.default(404, { body: errors });
        res.status(200).json(post);
    }
    catch (error) {
        next(error);
    }
});
exports.getPost = getPost;
const updatePost = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const user = res.locals.user;
    const { id } = req.params;
    const { title, description, category, private: isPrivate, videoUrl, } = req.body;
    try {
        let errors = {};
        if (!user)
            errors.user = 'You are not logged in';
        if (Object.keys(errors).length > 0)
            throw http_errors_1.default(401, { body: errors });
        if (!mongoose_1.isValidObjectId(id))
            errors.id = 'Post identification not valid';
        if (Object.keys(errors).length > 0)
            throw http_errors_1.default(400, { body: errors });
        const post = yield post_1.PostModel.findById(id);
        if (!post)
            errors.post = 'Post not found';
        if (Object.keys(errors).length > 0)
            throw http_errors_1.default(404, { body: errors });
        if ((post === null || post === void 0 ? void 0 : post.creator.toString()) !== user.id && user.role !== 'admin')
            errors.user = 'You are not owner/admin of this post';
        if (Object.keys(errors).length > 0)
            throw http_errors_1.default(406, { body: errors });
        if (title)
            post.title = title;
        if (description)
            post.description = description;
        if (category)
            post.category = category;
        if (isPrivate)
            post.private = isPrivate;
        if (videoUrl || videoUrl === '')
            post.videoUrl = videoUrl;
        if (req.files) {
            if (req.files.thumbnailImage) {
                if (req.files.thumbnailImage.mimetype === 'image/jpeg' ||
                    req.files.thumbnailImage.mimetype === 'image/png') {
                    yield util_1.deleteFile(post.thumbnailImage);
                    const fileName = util_1.makeId(8) + '-' + req.files.thumbnailImage.name;
                    post.thumbnailImage = fileName;
                    req.files.thumbnailImage.mv(path_1.join(__dirname, '../../public/images/' + fileName));
                }
                else {
                    errors.thumbnailImage = 'Only jpeg, jpg & png accepted';
                }
            }
            if (req.files.image1) {
                if (req.files.image1.mimetype === 'image/jpeg' ||
                    req.files.image1.mimetype === 'image/png') {
                    if (post.image1) {
                        yield util_1.deleteFile(post.image1);
                    }
                    const fileName = util_1.makeId(8) + '-' + req.files.image1.name;
                    post.image1 = fileName;
                    req.files.image1.mv(path_1.join(__dirname, '../../public/images/' + fileName));
                }
                else {
                    errors.image1 = 'Only jpeg, jpg & png accepted';
                }
            }
            if (req.files.image2) {
                if (req.files.image2.mimetype === 'image/jpeg' ||
                    req.files.image2.mimetype === 'image/png') {
                    if (post.image2) {
                        yield util_1.deleteFile(post.image2);
                    }
                    const fileName = util_1.makeId(8) + '-' + req.files.image2.name;
                    post.image2 = fileName;
                    req.files.image2.mv(path_1.join(__dirname, '../../public/images/' + fileName));
                }
                else {
                    errors.image2 = 'Only jpeg, jpg & png accepted';
                }
            }
            if (req.files.image3) {
                if (req.files.image3.mimetype === 'image/jpeg' ||
                    req.files.image3.mimetype === 'image/png') {
                    if (post.image3) {
                        yield util_1.deleteFile(post.image3);
                    }
                    const fileName = util_1.makeId(8) + '-' + req.files.image3.name;
                    post.image3 = fileName;
                    req.files.image3.mv(path_1.join(__dirname, '../../public/images/' + fileName));
                }
                else {
                    errors.image3 = 'Only jpeg, jpg & png accepted';
                }
            }
            if (req.files.image4) {
                if (req.files.image4.mimetype === 'image/jpeg' ||
                    req.files.image4.mimetype === 'image/png') {
                    if (post.image4) {
                        yield util_1.deleteFile(post.image4);
                    }
                    const fileName = util_1.makeId(8) + '-' + req.files.image4.name;
                    post.image4 = fileName;
                    req.files.image4.mv(path_1.join(__dirname, '../../public/images/' + fileName));
                }
                else {
                    errors.image4 = 'Only jpeg, jpg & png accepted';
                }
            }
        }
        if (Object.keys(errors).length > 0)
            throw http_errors_1.default(403, { body: errors });
        const updatedPost = yield (post === null || post === void 0 ? void 0 : post.save());
        res.status(200).json(updatedPost);
    }
    catch (error) {
        next(error);
    }
});
exports.updatePost = updatePost;
const deleteImageFormPost = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { fileName } = req.params;
    try {
        const post1 = yield post_1.PostModel.findOne({ image1: fileName });
        const post2 = yield post_1.PostModel.findOne({ image2: fileName });
        const post3 = yield post_1.PostModel.findOne({ image3: fileName });
        const post4 = yield post_1.PostModel.findOne({ image4: fileName });
        if (post1) {
            post1.image1 = undefined;
            yield post1.save();
        }
        if (post2) {
            post2.image1 = undefined;
            yield post2.save();
        }
        if (post3) {
            post3.image1 = undefined;
            yield post3.save();
        }
        if (post4) {
            post4.image1 = undefined;
            yield post4.save();
        }
        yield util_1.deleteFile(fileName);
    }
    catch (error) {
        next(error);
    }
});
exports.deleteImageFormPost = deleteImageFormPost;
const deletePost = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const user = res.locals.user;
    const { id } = req.params;
    try {
        let errors = {};
        if (!user)
            errors.user = 'You are not logged in';
        if (Object.keys(errors).length > 0)
            throw http_errors_1.default(401, { body: errors });
        if (!mongoose_1.isValidObjectId(id))
            errors.id = 'Post identification not valid';
        if (Object.keys(errors).length > 0)
            throw http_errors_1.default(400, { body: errors });
        const post = yield post_1.PostModel.findById(id);
        if (!post)
            errors.post = 'Post not found';
        if (Object.keys(errors).length > 0)
            throw http_errors_1.default(404, { body: errors });
        if ((post === null || post === void 0 ? void 0 : post.creator.toString()) !== user.id && user.role !== 'admin')
            errors.user = 'You are not owner/admin of this post';
        if (Object.keys(errors).length > 0)
            throw http_errors_1.default(406, { body: errors });
        const creatorUser = yield user_1.UserModel.findById(post === null || post === void 0 ? void 0 : post.creator);
        yield (post === null || post === void 0 ? void 0 : post.remove());
        if (post === null || post === void 0 ? void 0 : post.thumbnailImage)
            yield util_1.deleteFile(post === null || post === void 0 ? void 0 : post.thumbnailImage);
        if (post === null || post === void 0 ? void 0 : post.image1)
            yield util_1.deleteFile(post === null || post === void 0 ? void 0 : post.image1);
        if (post === null || post === void 0 ? void 0 : post.image2)
            yield util_1.deleteFile(post === null || post === void 0 ? void 0 : post.image2);
        if (post === null || post === void 0 ? void 0 : post.image3)
            yield util_1.deleteFile(post === null || post === void 0 ? void 0 : post.image3);
        if (post === null || post === void 0 ? void 0 : post.image4)
            yield util_1.deleteFile(post === null || post === void 0 ? void 0 : post.image4);
        creatorUser === null || creatorUser === void 0 ? void 0 : creatorUser.createdPosts.pull(id);
        yield (creatorUser === null || creatorUser === void 0 ? void 0 : creatorUser.save());
        res.status(200).json({ success: true });
    }
    catch (error) {
        next(error);
    }
});
exports.deletePost = deletePost;
const getVideoList = (_, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const posts = yield post_1.PostModel.find({
            private: false,
            videoUrl: { $exists: true, $ne: '' },
        })
            .sort({ createdAt: -1 })
            .limit(10)
            .exec();
        const videoExistsPosts = posts
            .map((post) => ({
            _id: post.id,
            videoUrl: post.videoUrl,
            title: post.title,
        }))
            .filter((vdo) => vdo.videoUrl !== '');
        res.status(200).json(videoExistsPosts);
    }
    catch (error) {
        next(error);
    }
});
exports.getVideoList = getVideoList;
//# sourceMappingURL=post.js.map