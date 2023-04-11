import express from 'express';
import cors from 'cors';

import router from './routes';
import todosRouter from './routes/todos';

const app = express();

app.use(
  cors({
    origin: [
      RegExp('127.0.0.1(:\d+)?|localhost(:\d+)?'),
    ]
  }),
  express.json(),
);

app.use('/', router);
app.use('/todos', todosRouter);

export default app;
