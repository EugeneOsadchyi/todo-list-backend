import { Request as ExpressRequest } from 'express';
import User from '../models/user';

interface Request extends ExpressRequest {
  user?: User;
}

export default Request;
