import { NextFunction, Request, Response } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../config';
import { AuthenticatedRequest } from '../types/CoreTypes';

export default function authMiddleWare(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) {
  const authToken = req.headers.authorization;
  const token = authToken?.split(' ')[1];

  if (token == null) return res.sendStatus(401);

  try {
    const { userId } = jwt.verify(token, config.JWT_SECRET) as JwtPayload;

    if (!userId) return res.sendStatus(403);

    // Assign the userId to the request object
    req.userId = userId;

    next();
  } catch (error) {
    console.error(error);
    return res.sendStatus(403);
  }
}
