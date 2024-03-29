import { Request, Response } from 'express';
import { MRecipe } from '../../../models/Recipe';

export default async function getRecipe(req: Request, res: Response) {
  const { _id } = req.params;

  const recipe = await MRecipe.findById(_id).lean();

  res.json(recipe);
}
