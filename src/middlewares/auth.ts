import express from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User';

const JWT_SIGNATURE = process.env.JWT_SIGNATURE;

export interface AuthenticatedRequest extends express.Request {
  user?: User;
}

export default async function checkAuth(req: AuthenticatedRequest, res: express.Response, next: express.NextFunction) {
  const token = req.header('Authorization');

  if (token) {
    const { sub: id = '' } = jwt.verify(token, JWT_SIGNATURE!);
    const user = await User.find({ id: id as string });

    if (user) {
      req.user = user;
      return next();
    }
  }

  return res.status(401).json({ error: 'Unauthorized' });
}
