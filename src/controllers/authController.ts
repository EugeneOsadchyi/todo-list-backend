import { Request, Response } from 'express';
import User from '../models/user';
import { ValidationError } from 'sequelize';
import { signJwt } from '../utils/jwt';


export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const user = await User.findOne({ where: { email } });

  if (!user || !(await user.matchesPassword(password))) {
    return res.status(401).json({ error: 'Invalid email or password' });
  }

  return res.status(200).json({ token: signJwt({ id: user.id }) });
}

export const register = async (req: Request, res: Response) => {
  const { name, email, password, passwordConfirmation } = req.body;

  if (password !== passwordConfirmation) {
    return res.status(400).json({ error: 'Passwords do not match' });
  }

  const existingUser = await User.findOne({ where: { email } });
  if (existingUser) {
    return res.status(400).json({ error: 'A user with this email already exists' });
  }

  const hashedPassword = await User.hashPassword(password);

  try {
    await User.create({ email, password: hashedPassword, name });
  } catch (error) {
    if (error instanceof ValidationError) {
      return res.status(400).json({ error: error.message });
    }
    throw error;
  }

  return res.sendStatus(201);
}
