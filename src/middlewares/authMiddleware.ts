import { Response, NextFunction } from 'express';
import Request from '../types/Request';
import jwt from 'jsonwebtoken';
import User from '../models/user';

const secret = process.env.JWT_SECRET;

interface DecodedToken {
  id: string;
}

export default async function authMiddleware(req: Request, res: Response, next: NextFunction) {
  const token = req.header('Authorization');

  if (!token) {
    return res.status(401).json({ error: 'Authorization header not found' });
  }

  try {
    const decoded = jwt.verify(token, secret!) as DecodedToken;
    const user = await User.findByPk(decoded.id);

    if (!user) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    req.user = user;

    next();
  } catch (error) {
    console.error(error);

    return res.status(401).json({ error: 'Invalid token' });
  }
}
