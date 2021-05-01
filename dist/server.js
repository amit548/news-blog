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
const dotenv_1 = require("dotenv");
const express_1 = __importDefault(require("express"));
const mongoose_1 = require("mongoose");
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const morgan_1 = __importDefault(require("morgan"));
const http_errors_1 = __importDefault(require("http-errors"));
const express_fileupload_1 = __importDefault(require("express-fileupload"));
const path_1 = require("path");
const compression_1 = __importDefault(require("compression"));
const helmet_1 = __importDefault(require("helmet"));
const user_1 = __importDefault(require("./routes/user"));
const me_1 = __importDefault(require("./routes/me"));
const post_1 = __importDefault(require("./routes/post"));
const user_2 = require("./models/user");
dotenv_1.config();
const server = express_1.default();
const PORT = process.env.PORT || 4000;
server.use(express_1.default.json());
server.use(cors_1.default({ credentials: true, origin: true }));
server.use(cookie_parser_1.default());
server.use(express_fileupload_1.default());
server.use(morgan_1.default('dev'));
server.use(compression_1.default());
server.use(helmet_1.default());
server.use('/public', express_1.default.static(path_1.join(__dirname, '../public')));
server.use('/api/user', user_1.default);
server.use('/api/me', me_1.default);
server.use('/api/post', post_1.default);
if (process.env.NODE_ENV == 'production') {
    server.use('/', express_1.default.static(path_1.join(__dirname, '../client/out')));
    server.get('/admin/login', (_, res) => {
        res.sendFile(path_1.join(__dirname, '../client/out/admin/login.html'));
    });
    server.get('/admin/*', (_, res) => {
        res.sendFile(path_1.join(__dirname, '../client/out/admin.html'));
    });
    server.all('*', (_, res) => {
        res.sendFile(path_1.join(__dirname, '../client/out/index.html'));
    });
}
server.use((_, __, next) => next(http_errors_1.default(404)));
server.use((error, _, res, __) => {
    const { status = 500, message = 'Internal server error', body } = error;
    res.status(status).json({ message, status, body });
});
(() => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield mongoose_1.connect(process.env.MONGO_URI || 'mongodb://localhost:27017', {
            dbName: process.env.MONGO_DB || 'test-blog',
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false,
        });
        console.log('Database connected');
        const adminUser = yield user_2.UserModel.findOne({ role: 'admin' });
        if (!adminUser) {
            const createNewUser = new user_2.UserModel({
                role: 'admin',
                firstName: 'Admin',
                lastName: 'User',
                email: 'admin@email.com',
                password: 'admin1',
            });
            yield createNewUser.save();
        }
        server.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
    }
    catch (err) {
        console.error(err);
        process.exit(1);
    }
}))();
//# sourceMappingURL=server.js.map