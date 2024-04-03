import { Response } from 'express';
import { MUser } from '../../../models/User';
import { AuthenticatedRequest } from '../../../types/CoreTypes';

export default async function addUserIngredients(
  req: AuthenticatedRequest<any, { ingredients: string[] }>,
  res: Response
) {
  try {
    const {
      userId,
      body: { ingredients },
    } = req;

    let user = await MUser.findById(userId).lean();

    const uniqueIngredients = [
      ...new Set([...(user?.ingredients || []), ...ingredients]),
    ];

    user = await MUser.findByIdAndUpdate(
      userId,
      { $set: { ingredients: uniqueIngredients } },
      { new: true }
    ).lean();

    res.json(user?.ingredients);
  } catch (error) {
    res.status(401).json({ error: 'Bad Request' });
  }
}
