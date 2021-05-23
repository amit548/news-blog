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
import webPush from 'web-push';

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

const publicVapidKey =
  'BJthRQ5myDgc7OSXzPCMftGw-n16F7zQBEN7EUD6XxcfTTvrLGWSIG7y_JxiWtVlCFua0S8MTB5rPziBqNx1qIo';
const privateVapidKey = '3KzvKasA2SoCxsp0iIG_o9B0Ozvl1XDwI63JRKNIWBM';

webPush.setVapidDetails(
  'mailto:rakeshwbp@gmail.com',
  publicVapidKey,
  privateVapidKey
);

server.post('/api/sub', async (req, res) => {
  try {
    const subs = await SubscriptionModel.find().select('-_id').exec();
    subs.forEach((sub) => {
      const payload = JSON.stringify({
        title: 'Test #1',
        img: 'skdfhdjkhcfd',
        body: 'Hello',
        _id: 'test_me',
      });

      webPush
        .sendNotification(sub, payload)
        .then((res) => console.log(res))
        .catch((err) => console.log(err));
    });
    res.json('200');
  } catch (error) {
    res.status(400);
  }
});

server.get('/api/sub', async (req, res) => {
  const result = await SubscriptionModel.find().select('-_id').exec();
  res.json(result);
});

server.delete('/api/sub', async (req, res) => {
  const result = await SubscriptionModel.find().exec();
  result.forEach(async (r) => {
    await SubscriptionModel.findByIdAndDelete(r._id);
  });
  res.json('OK');
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
