import { join } from 'path';
import { config } from 'dotenv';
import express, { json, NextFunction, Request, Response } from 'express';
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
import { SubscriptionModel } from './models/subscription';

config();

const server = express();

const PORT = process.env.PORT || 4000;

server.use(compression());
server.use(express.json());
server.use(cors({ credentials: true, origin: true }));
server.use(cookieParser());
server.use(expressFileupload());
server.use(morgan('dev'));

server.use('/api/public', express.static(join(__dirname, '../public')));

server.use('/api/user', userRoutes);
server.use('/api/me', meRoutes);
server.use('/api/post', postsRoutes);

server.get('/api/sub', async (req, res) => {
  res.send(await SubscriptionModel.find().exec());
});

import push from 'web-push';

const publicKey =
  'BOybMHcCo3XS9K3BfcfNP_5JBf2DszIrs9_DbHOgq2ORwKftWqwqMcJeGsal32h125do-pCC2HH28UgOv9pCEm4';
const privateKey = 'p0ChiOQ02FwqjckZGu_QopmurCw3g93QC9YtLQoqMEg';

push.setVapidDetails('mailto:rakeshwbp@gmail.com', publicKey, privateKey);

server.post('/api/sub', async (req, res) => {
  const notificationPayload = JSON.stringify({
    _id: '60aa2aa64fe552b36a406624',
    title:
      'ব্লক অফিস গ্রাম রোজগার সহায়ক পদে কর্মী নিয়োগ | Gram Rojgar Sahayak Recruitment 2021 | HS Pass',
    img: `http://kormerkhoj.com/api/public/images/CXOvAvSt-20210523_160243_resize_68.jpg`,
  });

  try {
    (await SubscriptionModel.find().exec()).forEach(async (sub) => {
      try {
        await push.sendNotification(sub, notificationPayload);
      } catch (err) {
        console.log('Error #1', err);
      }
    });
  } catch (err) {
    console.log('Error #2', err);
  }

  res.status(201).json({});
});

server.delete('/api/sub', async (req, res) => {
  const subs = await SubscriptionModel.find().exec();
  subs.forEach(async (sub) => {
    await SubscriptionModel.findByIdAndDelete(sub._id);
  });
  res.status(204).json({});
});

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
