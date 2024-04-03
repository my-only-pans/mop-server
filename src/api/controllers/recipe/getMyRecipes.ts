import { Response } from 'express';
import { AuthenticatedRequest } from '../../../types/CoreTypes';
import { MRecipe } from '../../../models/Recipe';

export default async function getMyRecipes(
  req: AuthenticatedRequest,
  res: Response
) {
  try {
    const { userId } = req;

    if (!userId) return res.status(400).json({ error: 'Forbidden' });

    const myRecipes = await MRecipe.find({ owner: userId }).lean();

    return myRecipes;
  } catch (error) {
    res.status(400).json({
      error: 'Bad Request',
    });
  }
}
