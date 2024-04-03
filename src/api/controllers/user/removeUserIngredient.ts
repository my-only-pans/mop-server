import { Response } from 'express';
import { MUser } from '../../../models/User';
import { AuthenticatedRequest } from '../../../types/CoreTypes';

export default async function removeUserIngredient(
  req: AuthenticatedRequest<any, { ingredient: string }>,
  res: Response
) {
  const {
    userId,
    body: { ingredient },
  } = req;

  try {
    const user = await MUser.findByIdAndUpdate(
      userId,
      { $pull: { ingredients: ingredient } },
      { new: true }
    ).lean();

    res.json(user?.ingredients);
  } catch (error) {
    console.log(error);
    res.status(401).json({ error: 'Bad Request' });
  }
}
