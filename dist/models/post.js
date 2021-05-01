"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostModel = void 0;
const mongoose_1 = require("mongoose");
const PostSchema = new mongoose_1.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    thumbnailImage: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        required: true,
        trim: true,
    },
    videoUrl: {
        type: String,
        trim: true,
    },
    image1: {
        type: String,
    },
    image2: {
        type: String,
    },
    image3: {
        type: String,
    },
    image4: {
        type: String,
    },
    category: {
        type: String,
        enum: [
            'সরকারি চাকরি',
            'বেসরকারি চাকরি',
            'পরীক্ষার সিলেবাস',
            'রেজাল্ট',
            'নোটিশ',
        ],
        default: 'সরকারি চাকরি',
        trim: true,
        required: true,
    },
    creator: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    private: {
        type: Boolean,
        required: true,
        default: true,
    },
}, { timestamps: true });
const PostModel = mongoose_1.model('Post', PostSchema);
exports.PostModel = PostModel;
//# sourceMappingURL=post.js.map