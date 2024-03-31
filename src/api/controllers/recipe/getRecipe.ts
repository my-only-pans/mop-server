import { Request, Response } from 'express';
import { MRecipe } from '../../../models/Recipe';

export default async function getRecipe(req: Request, res: Response) {
  const { _id } = req.params;

  const recipe = await MRecipe.findById(_id)
    .populate('owner', { username: 1, _id: 1 })
    .lean();

  res.json(recipe);
}
