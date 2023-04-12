import { Response, NextFunction } from 'express';
import Request from '../types/Request';
import User from '../models/user';
import { verifyJwt } from '../utils/jwt';

interface DecodedToken {
  id: string;
}

export default async function authMiddleware(req: Request, res: Response, next: NextFunction) {
  const token = req.header('Authorization');

  if (!token) {
    return res.status(401).json({ error: 'Authorization header not found' });
  }

  try {
    const decoded = verifyJwt(token) as DecodedToken;
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
