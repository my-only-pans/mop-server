import { Response } from 'express';
import { AuthenticatedRequest } from '../../../types/CoreTypes';
import { MUser } from '../../../models/User';

export default async function unsaveRecipe(
  req: AuthenticatedRequest<any, { recipeId: string }>,
  res: Response
) {
  try {
    const {
      userId,
      body: { recipeId },
    } = req;

    const user = await MUser.findByIdAndUpdate(userId, {
      savedRecipes: { $pull: recipeId },
    }).lean();

    res.json(user?.savedRecipes);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: 'Bad Request' });
  }
}
