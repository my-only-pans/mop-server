import { Request, Response } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../../config';
import { MUser, User } from '../../models/User';
import { AuthenticatedRequest } from '../../types/CoreTypes';

export default async function getMyProfile(
  req: AuthenticatedRequest,
  res: Response
) {
  try {
    const user: User | null = await MUser.findById(req.userId).lean();

    if (!user) {
      return res.status(500).json('User not registered');
    }

    const {
      _id,
      username,
      firstName,
      lastName,
      email,
      ingredients,
      equipment,
      phone,
      savedRecipes,
    } = user;

    res.send({
      _id,
      username,
      firstName,
      lastName,
      email,
      phone,
      ingredients,
      equipment,
      savedRecipes,
    });
  } catch (error) {
    res.status(401).json({ error: 'Bad Request' });
  }
}
