import express from 'express';
import Todo from '../models/Todo';
import { checkRequiredBodyProperties } from '../middlewares/checkRequiredProperties';

const router = express.Router();

router.get('/', async (req, res) => {
  let todos = await Todo.all();

  if (req.query.filter === 'completed') {
    todos.filter((todo) => todo.completed);
  } else if (req.query.filter === 'incompleted') {
    todos = todos.filter((todo) => !todo.completed);
  }

  res.json(todos);
});

router.post('/', checkRequiredBodyProperties(['title']), async (req, res) => {
  const todo = await Todo.create(req.body.title);

  res.status(201).json(todo);
});

router.put('/:id/markTodoCompleted', async (req, res) => {
  const todo = await Todo.update(Number(req.params.id), { completed: true });

  if (!todo) {
    sendNotFound(res);
    return;
  }

  res.json(todo);
});

router.put('/:id/markTodoUncompleted', async (req, res) => {
  const todo = await Todo.update(Number(req.params.id), { completed: false });

  if (!todo) {
    sendNotFound(res);
    return;
  }

  res.json(todo);
});

router.delete('/:id', async (req, res) => {
  const isDeleted = await Todo.delete(Number(req.params.id));

  if (!isDeleted) {
    sendNotFound(res);
    return;
  }

  res.status(204).send();
});

function sendNotFound(res: express.Response) {
  res.status(404).json({ error: 'Not found' });
}

export default router;
