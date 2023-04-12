import { NextFunction, Response } from 'express';
import Request from '../types/Request';

export default (err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  return res.status(500).send('Something went wrong!');
}
