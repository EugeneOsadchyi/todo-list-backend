import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { checkRequiredBodyProperties } from '../middlewares/checkRequiredProperties';
import User from '../models/User';

const SALT_ROUNDS = 10;
const JWT_SIGNATURE = process.env.JWT_SIGNATURE;

const router = express.Router();

router.post('/login', checkRequiredBodyProperties(['email', 'password']), async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }

  const user = await User.find({ email: req.body.email });

  if (!user) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  const match = await bcrypt.compare(password, user.passwordHash);
  if (!match) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  return res.status(200).json({ token: jwt.sign({ sub: user.id }, JWT_SIGNATURE!) });
});

router.post('/register', checkRequiredBodyProperties(['name', 'email', 'password', 'passwordConfirmation']), async (req, res) => {
  const { name, email, password, passwordConfirmation } = req.body;

  if (password !== passwordConfirmation) {
    return res.status(400).json({ error: 'Passwords do not match' });
  }

  if (await User.find({ email })) {
    return res.status(400).json({ error: 'User already exists' });
  }

  await register(name, email, password);

  return res.status(201).send();
});

async function register(name: string, email: string, password: string): Promise<void> {
  try {
    const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);

    const user = new User(name, email, passwordHash);
    await user.save();
  } catch (error) {
    console.error(error);
    throw new Error('Could not register user');
  }
}

export default router;
