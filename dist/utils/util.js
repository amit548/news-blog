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
exports.deleteFile = exports.makeId = void 0;
const util_1 = require("util");
const fs_1 = require("fs");
const path_1 = require("path");
const makeId = (length) => {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
};
exports.makeId = makeId;
const deleteFile = (fileName) => __awaiter(void 0, void 0, void 0, function* () {
    const unlinkFile = util_1.promisify(fs_1.unlink);
    try {
        yield unlinkFile(path_1.join(__dirname, '../../public/images/' + fileName));
    }
    catch (_) { }
});
exports.deleteFile = deleteFile;
//# sourceMappingURL=util.js.map