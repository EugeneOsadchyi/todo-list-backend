import { Response } from 'express';
import Request from '../../types/Request';

export function sendNotFound(req: Request, res: Response): Response {
  return res.status(404).json({ error: 'Not found' });
}
