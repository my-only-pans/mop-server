import { Request, Response } from 'express';
import { MRecipe } from '../../../models/Recipe';

export default async function getRecipe(req: Request, res: Response) {
  try {
    const { _id } = req.params;

    const recipe = await MRecipe.findById(_id)
      .populate('owner', { username: 1, _id: 1 })
      .lean();

    res.json(recipe);
  } catch (error) {
    res.status(400).send({ error: 'Recipe not found' });
  }
}
