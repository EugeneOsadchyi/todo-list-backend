import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/user';

const JWT_SECRET = process.env.JWT_SECRET;


export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const user = await User.findOne({ where: { email } });

  if (!user || !(await user.matchesPassword(password))) {
    return res.status(401).json({ message: 'Invalid email or password' });
  }

  return res.status(200).json({ token: jwt.sign({ id: user.id }, JWT_SECRET!) });
}

export const register = async (req: Request, res: Response) => {
  const { name, email, password, passwordConfirmation } = req.body;

  if (password !== passwordConfirmation) {
    return res.status(400).json({ error: 'Passwords do not match' });
  }

  const existingUser = await User.findOne({ where: { email } });
  if (existingUser) {
    return res.status(400).json({ message: 'A user with this email already exists' });
  }

  const hashedPassword = await User.hashPassword(password);

  await User.create({ email, password: hashedPassword, name });

  return res.sendStatus(201);
}
