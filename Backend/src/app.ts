import express from 'express';
import router from './routes';
import morgan from 'morgan';
import path from 'path';
import cors from 'cors';

//middleware to log request type and timestamp
const logger = morgan('combined');

const app = express();
app.use(cors());

app.use(express.static(path.join(__dirname, '../assets')));
app.use(express.static(path.join(__dirname, '../assets/converted')));

app.use(
  '/api',
  router,
  logger,
  (req: express.Request, res: express.Response) => {
    res.status(404).send('Enter file name to convert');
  }
);

export default app;
