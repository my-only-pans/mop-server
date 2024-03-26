import { Request, Response } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../../config';
import { MUser, User } from '../../models/User';
import { AuthenticatedRequest } from '../../utils/authMiddleware';

export default async function getMyProfile(
  req: AuthenticatedRequest,
  res: Response
) {
  const user: User | null = await MUser.findById(req.userId).lean();

  if (!user) {
    return res.status(500).json('User not registered');
  }

  const { _id, username, firstName, lastName, email } = user;

  res.send({ _id, username, firstName, lastName, email });
}
