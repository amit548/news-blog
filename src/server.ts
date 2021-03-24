import express, { NextFunction, Request, Response } from 'express';
import { connect } from 'mongoose';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import createError from 'http-errors';

import userRoutes from './routes/user';
import HttpException from './exceptions/http-exception';

const server = express();

server.use(express.json());
server.use(cookieParser());
server.use(morgan('dev'));

server.use('/api/user', userRoutes);

server.use((_, __, next) => next(createError(404)));

server.use(
  (error: HttpException, _: Request, res: Response, __: NextFunction) => {
    const { status = 500, message = 'Internal server error', body } = error;
    res.status(status).json({ message, status, body });
  }
);

(async () => {
  try {
    await connect('mongodb://localhost:27017', {
      dbName: 'test-blog',
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });
    console.log('Database connected');
    server.listen(4000, () =>
      console.log(`Server running at http://localhost:${4000}`)
    );
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
})();
