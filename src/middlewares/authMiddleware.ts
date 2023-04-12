import { Response, NextFunction } from 'express';
import Request from '../types/Request';
import User from '../models/user';
import { sendUnauthorized } from '../controllers/helpers/responseHelpers';
import { verifyJwt } from '../utils/jwt';

interface DecodedToken {
  id: string;
}

export default async function authMiddleware(req: Request, res: Response, next: NextFunction) {
  const token = req.header('Authorization');

  if (!token) {
    return sendUnauthorized(req, res);
  }

  try {
    const decoded = verifyJwt(token) as DecodedToken;
    const user = await User.findByPk(decoded.id);

    if (!user) {
      return sendUnauthorized(req, res);
    }

    req.user = user;

    next();
  } catch (error) {
    console.error(error);

    return res.status(401).json({ error: 'Invalid token' });
  }
}
