import express from 'express';
import cors from 'cors';

const app = express();

app.use(
  cors({
    origin: [
      RegExp('127.0.0.1(:\d+)?|localhost(:\d+)?'),
    ]
  }),
  express.json(),
);

app.use('/', require('./routes/index').default);
app.use('/todos', require('./routes/todos').default);
app.use('/auth', require('./routes/auth').default);

export default app;
