import { Response } from 'express';
import { AuthenticatedRequest } from '../../../types/CoreTypes';
import { MUser } from '../../../models/User';
import { MRecipe } from '../../../models/Recipe';

export default async function getSavedRecipes(
  req: AuthenticatedRequest,
  res: Response
) {
  try {
    const { userId } = req.body;

    const user = await MUser.findById(userId, { savedRecipes: 1 }).lean();

    const recipes = await MRecipe.find({
      _id: { $in: user?.savedRecipes || [] },
    }).lean();

    return recipes;
  } catch (error) {
    res.status(401).json({ error: 'Something went wrong.' });
  }
}
