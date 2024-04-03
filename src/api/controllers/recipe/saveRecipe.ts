import { Response } from 'express';
import { AuthenticatedRequest } from '../../../types/CoreTypes';
import { MRecipe } from '../../../models/Recipe';
import { MUser } from '../../../models/User';

export default async function saveRecipe(
  req: AuthenticatedRequest<any, { recipeId: string }>,
  res: Response
) {
  try {
    const {
      userId,
      body: { recipeId },
    } = req;

    const recipe = await MRecipe.findOne({
      owner: { $ne: userId },
      _id: recipeId,
    }).lean();

    if (!recipe) {
      return res.status(400).json({ error: 'Bad Request' });
    }

    const user = await MUser.findByIdAndUpdate(
      userId,
      { savedRecipes: { $push: recipeId } },
      { new: true }
    ).lean();

    res.json(user?.savedRecipes);
  } catch (error) {
    res.status(401).json({ error: 'Something went wrong' });
  }
}
