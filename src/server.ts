import express from 'express';
import { connect } from 'mongoose';
import morgan from 'morgan';

const server = express();

server.use(express.json());
server.use(morgan('dev'));

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
