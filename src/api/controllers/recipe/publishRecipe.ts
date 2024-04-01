import { Response } from 'express';
import {
  MRecipe,
  MRecipeDraft,
  Recipe,
  RecipeDraft,
} from '../../../models/Recipe';
import { AuthenticatedRequest } from '../../../types/CoreTypes';

export default async function publishRecipe(
  req: AuthenticatedRequest<any, RecipeDraft>,
  res: Response
) {
  try {
    const {
      userId,
      body: { _id: draftId, ...input },
    } = req;

    const isOwner = !!(await MRecipeDraft.findOne(
      { _id: draftId, owner: userId },
      { _id: 1 }
    ).lean());

    if (!isOwner) {
      return res
        .status(403)
        .json({ error: 'You have no acces to this recipe.' });
    }

    const existingRecipe = await MRecipe.findOne(
      { owner: userId, draft: draftId },
      { _id: 1 }
    ).lean();

    const ingredientTags = input.ingredients?.map((i) => i._id);

    if (existingRecipe) {
      const recipe = await MRecipe.findOneAndUpdate(
        { owner: userId, draft: draftId },
        input,
        ingredientTags
      ).lean();

      return res.send(recipe);
    }

    const newRecipe = await new MRecipe({
      draft: draftId,
      ...input,
      ingredientTags,
    }).save();

    console.log(req.body);

    res.send(newRecipe);
  } catch (error) {
    console.log(error);
    res.status(401).json({ error });
  }
}
