import { Response } from 'express';
import { AuthenticatedRequest } from '../../../types/CoreTypes';
import { MRecipe } from '../../../models/Recipe';
import { MUser } from '../../../models/User';
import { mongoose } from '@typegoose/typegoose';

export default async function saveRecipe(
  req: AuthenticatedRequest<any, { recipeId: string }>,
  res: Response
) {
  try {
    const {
      userId,
      body: { recipeId },
    } = req;

    console.log(recipeId);

    const recipe = await MRecipe.findOne({
      owner: { $ne: userId },
      _id: recipeId,
    }).lean();

    if (!recipe) {
      return res.status(400).json({ error: 'Bad Request' });
    }

    let alreadySaved = await MUser.findOne({
      _id: userId,
      savedRecipes: recipeId,
    }).lean();

    if (alreadySaved) {
      return res.json('Already included');
    } else {
      const user = await MUser.findByIdAndUpdate(
        userId,
        { $push: { savedRecipes: recipeId } },
        { new: true }
      )
        .lean()
        .populate('savedRecipes', { _id: 1, username: 1 });

      res.json(user?.savedRecipes);
    }
  } catch (error) {
    res.status(401).json({ error: 'Something went wrong' });
  }
}
