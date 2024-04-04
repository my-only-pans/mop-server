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

    const {
      cookTime,
      description,
      prepTime,
      serving,
      title,
      categories,
      equipment,
      ingredients,
      instructions,
      imageUrl,
    } = input;

    const ingredientTags = input.ingredients?.map((i) => i._id);

    if (existingRecipe) {
      const recipe = await MRecipe.findOneAndUpdate(
        { owner: userId, draft: draftId },
        {
          cookTime,
          description,
          prepTime,
          serving,
          title,
          categories,
          equipment,
          ingredients,
          instructions,
          ingredientTags,
          imageUrl,
          updatedAt: new Date(),
        }
      ).lean();

      return res.send(recipe);
    } else {
      const newRecipe = await new MRecipe({
        draft: draftId,
        ...input,
        ingredientTags,
      }).save();

      res.send(newRecipe);
    }
  } catch (error) {
    console.log(error);
    res.status(401).json({ error });
  }
}
