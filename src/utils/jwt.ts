import jwt from 'jsonwebtoken';

const secret = process.env.JWT_SECRET;

export function verifyJwt(token: string) {
  return jwt.verify(token, secret!);
}

export function signJwt(payload: object) {
  return jwt.sign(payload, secret!);
}
