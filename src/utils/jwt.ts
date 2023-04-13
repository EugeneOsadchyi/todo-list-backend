import jwt, { JwtPayload } from 'jsonwebtoken';

const secret = process.env.JWT_SECRET || 'secret'; // TODO: fix this
const expiresIn = process.env.JWT_EXPIRES_IN || '1d';

export function verifyJwt(token: string): string | JwtPayload {
  return jwt.verify(token, secret);
}

export function signJwt(payload: object): string {
  return jwt.sign(payload, secret, { expiresIn });
}
