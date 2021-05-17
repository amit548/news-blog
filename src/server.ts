import { join } from 'path';
import { config } from 'dotenv';
import express, { NextFunction, Request, Response } from 'express';
import { connect } from 'mongoose';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import createError from 'http-errors';
import expressFileupload from 'express-fileupload';
import compression from 'compression';

import userRoutes from './routes/user';
import meRoutes from './routes/me';
import postsRoutes from './routes/post';
import HttpException from './exceptions/http-exception';
import { UserModel } from './models/user';

config();

const server = express();

const PORT = process.env.PORT || 4000;

server.use(compression());
server.use(express.json());
server.use(cors({ credentials: true, origin: true }));
server.use(cookieParser());
server.use(expressFileupload());
server.use(morgan('dev'));

server.use('/public', express.static(join(__dirname, '../public')));

server.use('/api/user', userRoutes);
server.use('/api/me', meRoutes);
server.use('/api/post', postsRoutes);

server.use((_, __, next) => next(createError(404)));

server.use(
  (error: HttpException, _: Request, res: Response, __: NextFunction) => {
    const { status = 500, message = 'Internal server error', body } = error;
    res.status(status).json({ message, status, body });
  }
);

(async () => {
  try {
    await connect(process.env.MONGO_URI || 'mongodb://localhost:27017', {
      dbName: process.env.MONGO_DB || 'test-blog',
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });
    console.log('Database connected');

    const adminUser = await UserModel.findOne({ role: 'admin' });
    if (!adminUser) {
      const createNewUser = new UserModel({
        role: 'admin',
        firstName: 'Admin',
        lastName: 'User',
        email: 'admin@email.com',
        password: 'admin1',
      });
      await createNewUser.save();
    }

    server.listen(PORT, () =>
      console.log(`Server running at http://localhost:${PORT}`)
    );
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
})();
