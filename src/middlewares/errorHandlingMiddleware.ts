import { NextFunction, Response } from 'express';
import Request from '../types/Request';

export default (err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err);
  return res.status(500).json({ error: 'Something went wrong!' });
}
