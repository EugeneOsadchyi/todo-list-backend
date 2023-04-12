import { Response } from 'express';
import Todo from '../models/todo';
import Request from '../types/Request';
import { sendNotFound } from './helpers/responseHelpers';

export const createTodo = async (req: Request, res: Response) => {
  const { title, completed } = req.body;
  const userId = req.user!.id;

  const todo = await Todo.create({ title, completed, userId });

  res.status(201).json(todo.toJSON());
};

export const getTodos = async (req: Request, res: Response) => {
  const { filter } = req.query;

  const userId = req.user!.id;

  let filterQuery = {};

  if (filter === 'completed') {
    filterQuery = { completed: true };
  } else if (filter === 'incompleted') {
    filterQuery = { completed: false };
  }

  const todos = await Todo.findAll({ where: { ...filterQuery, userId  } });

  res.json(Todo.toJSON(todos));
};

export const deleteTodo = async (req: Request, res: Response) => {
  const { id } = req.params;
  const userId = req.user!.id;

  const todo = await Todo.findOne({ where: { id, userId } });

  if (todo) {
    await todo.destroy();
  }

  return res.sendStatus(204);
}

export const updateTodo = (callback: (todo: Todo) => void) => {
  return async (req: Request, res: Response) => {
    const { id } = req.params;
    const userId = req.user!.id;

    const todo = await Todo.findOne({ where: { id, userId } });

    if (!todo) {
      return sendNotFound(req, res);
    }

    if (todo) {
      callback(todo);
      await todo.save();
    }

    return res.status(200).json(todo.toJSON());
  }
}
