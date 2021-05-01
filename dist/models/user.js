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
exports.UserModel = void 0;
const bcrypt_1 = require("bcrypt");
const mongoose_1 = require("mongoose");
const UserSchema = new mongoose_1.Schema({
    firstName: {
        type: String,
        trim: true,
        required: true,
    },
    lastName: {
        type: String,
        trim: true,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        lowercase: true,
        trim: true,
        required: true,
    },
    password: {
        type: String,
        trim: true,
        required: true,
    },
    role: {
        type: String,
        enum: ['admin', 'user'],
        default: 'user',
        trim: true,
        required: true,
    },
    createdUsers: [{ type: mongoose_1.Schema.Types.ObjectId, ref: 'User' }],
    createdPosts: [{ type: mongoose_1.Schema.Types.ObjectId, ref: 'Post' }],
}, {
    timestamps: true,
    toObject: {
        transform: (_, ret) => {
            delete ret.password;
        },
    },
    toJSON: {
        transform: (_, ret) => {
            delete ret.password;
        },
    },
});
UserSchema.pre('save', function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const firstName = this.firstName.trim();
            const lastName = this.lastName.trim();
            this.firstName =
                firstName.charAt(0).toUpperCase() + firstName.slice(1).toLowerCase();
            this.lastName =
                lastName.charAt(0).toUpperCase() + lastName.slice(1).toLowerCase();
            if (this.isNew) {
                this.password = yield bcrypt_1.hash(this.password, 12);
            }
            next();
        }
        catch (error) {
            next(error);
        }
    });
});
const UserModel = mongoose_1.model('User', UserSchema);
exports.UserModel = UserModel;
//# sourceMappingURL=user.js.map