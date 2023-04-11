import express from 'express';
import Todo from '../models/Todo';
import { checkRequiredBodyProperties } from '../middlewares/checkRequiredProperties';

const router = express.Router();

router.get('/', async (req, res) => {
  const todos = await Todo.all();
  res.json(todos);
});

router.get('/:id', async (req, res) => {
  const todo = await Todo.find(Number(req.params.id));

  if (!todo) {
    res.status(404).json({ error: 'Not found' });
    return;
  }

  res.json(todo);
});

router.post('/', checkRequiredBodyProperties(['title']), async (req, res) => {
  const todo = await Todo.create(req.body.title);

  res.status(201).json(todo);
});

router.put('/:id', checkRequiredBodyProperties(['title']), async (req, res) => {
  const todo = await Todo.update(Number(req.params.id), req.body.title);

  if (!todo) {
    res.status(404).json({ error: 'Not found' });
    return;
  }

  res.json(todo);
});

router.delete('/:id', async (req, res) => {
  const isDeleted = await Todo.delete(Number(req.params.id));

  if (!isDeleted) {
    res.status(404).json({ error: 'Not found' });
    return;
  }

  res.status(204).send();
});

export default router;
