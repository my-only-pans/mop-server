import { Response } from 'express';
import { MUser } from '../../../models/User';
import { AuthenticatedRequest } from '../../../types/CoreTypes';

export default async function addUserEquipment(
  req: AuthenticatedRequest<any, { ingredient: string[] }>,
  res: Response
) {
  try {
    const {
      userId,
      body: { ingredient },
    } = req;

    let user = await MUser.findById(userId).lean();

    const uniqueIngredients = [
      ...new Set([...(user?.ingredients || []), ...ingredient]),
    ];

    user = await MUser.findByIdAndUpdate(
      userId,
      { $set: { ingredient: uniqueIngredients } },
      { new: true }
    ).lean();

    res.json(user?.ingredients);
  } catch (error) {
    res.status(401).json({ error: 'Bad Request' });
  }
}
