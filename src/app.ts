import express from 'express';
import router from './routes';
import morgan from 'morgan';


//middleware to log request type and timestamp
const logger = morgan('combined');

const app = express();
const port = 7013;

app.use('/api', router, logger, (req, res) => {
  res.status(404).send('Enter file name to convert');
});



export default app;
