import express from 'express';
import cors from 'cors';
import { authMiddleware, errorHandlingMiddleware } from './middlewares';
import { AuthRoutes, TodoRoutes } from './routes';
import { sendNotFound } from './controllers/helpers/responseHelpers';

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

app.use('/api/auth', AuthRoutes);
app.use('/api/todos', authMiddleware, TodoRoutes);

app.all('*', sendNotFound);
app.use(errorHandlingMiddleware);

export default app;
