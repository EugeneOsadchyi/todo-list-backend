import express from 'express';
import cors from 'cors';
import { errorHandlingMiddleware } from './middlewares';
import { sendNotFound } from './controllers/helpers/responseHelpers';
import indexRouter from './routes';

const app = express();

app.use(
  cors({
    origin: [
      "https://todo.moneys-club.pp.ua",
      RegExp('127.0.0.1(:\d+)?|localhost(:\d+)?'),
    ]
  }),
  express.json(),
);

app.use('/api', indexRouter);

app.all('*', sendNotFound);
app.use(errorHandlingMiddleware);

export default app;
