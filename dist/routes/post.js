"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const post_1 = require("../controllers/post");
const auth_1 = __importDefault(require("../middlewares/auth"));
const router = express_1.Router();
router.post('/', [
    express_validator_1.body('title')
        .isLength({ min: 6 })
        .withMessage('Title must be 6 char long')
        .notEmpty()
        .withMessage('Title is required'),
    express_validator_1.body('description')
        .isLength({ min: 6 })
        .withMessage('Description must be 20 char long')
        .notEmpty()
        .withMessage('Description is required'),
    express_validator_1.body('category').notEmpty().withMessage('Category is required'),
], auth_1.default, post_1.createPost);
router.get('/', post_1.getPosts);
router.get('/video', post_1.getVideoList);
router.get('/news', post_1.getPostsByCategory);
router.get('/admin', auth_1.default, post_1.getPostsForAdmin);
router.get('/:id', post_1.getPost);
router.delete('/:id', auth_1.default, post_1.deletePost);
router.delete('/del/:fileName', auth_1.default, post_1.deleteImageFormPost);
router.put('/:id', [
    express_validator_1.body('title')
        .isLength({ min: 6 })
        .withMessage('Title must be 6 char long')
        .notEmpty()
        .withMessage('Title is required'),
    express_validator_1.body('description')
        .isLength({ min: 6 })
        .withMessage('Description must be 20 char long')
        .notEmpty()
        .withMessage('Description is required'),
    express_validator_1.body('category').notEmpty().withMessage('Category is required'),
], auth_1.default, post_1.updatePost);
exports.default = router;
//# sourceMappingURL=post.js.map