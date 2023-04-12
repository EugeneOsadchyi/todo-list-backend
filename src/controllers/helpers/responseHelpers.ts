import { Response } from 'express';

export function sendNotFound(res: Response): Response {
  return res.status(404).json({ error: 'Not found' });
}
