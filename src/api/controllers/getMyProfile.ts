import { Request, Response } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../../config';
import { MUser, User } from '../../models/User';

export default async function getMyProfile(req: Request, res: Response) {
  const authToken = req.headers.authorization;

  if (!authToken) {
    return res.status(401).json({ message: 'Authorization header missing' });
  }

  const [_, token] = authToken.split(' ');

  const { userId } = jwt.verify(token, config.JWT_SECRET) as JwtPayload;

  const user: User | null = await MUser.findById(userId).lean();

  if (!user) {
    return res.status(500).json('User not registered');
  }

  const { _id, username, firstName, lastName, email } = user;

  res.send({ _id, username, firstName, lastName, email });
}
