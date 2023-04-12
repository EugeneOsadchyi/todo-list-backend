import jwt, { JwtPayload } from 'jsonwebtoken';

const secret = process.env.JWT_SECRET || 'secret'; // TODO: fix this

export function verifyJwt(token: string): string | JwtPayload {
  return jwt.verify(token, secret!);
}

export function signJwt(payload: object): string {
  return jwt.sign(payload, secret!);
}
