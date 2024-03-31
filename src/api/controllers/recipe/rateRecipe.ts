import { Response } from 'express';
import { AuthenticatedRequest } from '../../../types/CoreTypes';
import { ParamsDictionary } from 'express-serve-static-core';
import { MRecipe, Recipe } from '../../../models/Recipe';

interface RateRecipeInput {
  recipeId: string;
  rating: number;
}

export default async function rateRecipe(
  req: AuthenticatedRequest<ParamsDictionary, RateRecipeInput>,
  res: Response
) {
  try {
    const {
      userId,
      body: { recipeId, rating },
    } = req;

    if (!userId) return res.status(400).json({ error: 'Forbidden' });

    const newUserRating = {
      user: userId,
      rating,
    };

    const recipe: any = await MRecipe.findById(recipeId).lean();

    if (!recipe)
      return res.status(400).json({ error: 'Recipe does not exist' });

    const existingRatingIndex = recipe?.ratings?.findIndex(
      (r: any) => r.user === userId
    );

    let updatedRecipe: Recipe;
    const ratings = [...(recipe?.ratings || [])];

    if (existingRatingIndex) {
      ratings[existingRatingIndex].rating = rating;
    } else {
      ratings.push(newUserRating);
    }

    const totalRating = ratings.reduce((acc, cur) => acc + cur.rating, 0);
    const averageRating = totalRating / ratings.length;

    updatedRecipe = (await MRecipe.findByIdAndUpdate(
      recipeId,
      { ratings, averageRating },
      { new: true }
    )
      .populate('owner')
      .lean()) as Recipe;

    return updatedRecipe;
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: 'Bad Request' });
  }
}
