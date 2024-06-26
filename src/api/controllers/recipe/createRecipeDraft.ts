import { Request, Response } from 'express';
import Category from '../../../models/Category';
import { AuthenticatedRequest } from '../../../types/CoreTypes';
import { MRecipeDraft } from '../../../models/Recipe';

interface RecipeDraftInput {
  title: string;
  description: string;
  prepTime: number;
  cookTime: number;
  serving: number;
  categories?: Category[];
}

export default async function createRecipeDraft(
  { body, userId }: AuthenticatedRequest<any, RecipeDraftInput>, // Annotate body with RecipeDraftInput
  res: Response
) {
  try {
    const {
      title,
      description,
      prepTime,
      cookTime,
      serving,
      categories,
      ...rest
    } = body;

    if (Object.keys(rest).length)
      return res.status(400).json({ error: 'Invalid data received' });
    if (!title) return res.status(400).json({ error: 'Title is required' });
    if (!description)
      return res.status(400).json({ error: 'Description is required' });
    if (!prepTime)
      return res.status(400).json({ error: 'Prep Time is required' });
    if (!cookTime)
      return res.status(400).json({ error: 'Cook Time is required' });
    if (!serving) return res.status(400).json({ error: 'Serving is required' });

    const draft = (
      await new MRecipeDraft({
        owner: userId,
        ...body,
        createdAt: new Date(),
        updatedAt: new Date(),
      }).save()
    ).toObject();

    res.send(draft);
  } catch (error) {
    console.log(error);
    res.sendStatus(401);
  }
}
