"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class HttpException extends Error {
    constructor(message, status, body) {
        super(message);
        this.message = message;
        this.status = status;
        this.body = body;
    }
}
exports.default = HttpException;
//# sourceMappingURL=http-exception.js.map