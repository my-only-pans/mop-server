import { Response } from 'express';
import { AuthenticatedRequest } from '../../../types/CoreTypes';
import { MRecipeDraft, RecipeDraft } from '../../../models/Recipe';

export default async function saveRecipeDraft(
  req: AuthenticatedRequest<any, RecipeDraft>,
  res: Response
) {
  try {
    const {
      userId,
      body: { _id, ...input },
    } = req;

    const updatedValues = { ...input };

    input.equipment = input.equipment?.map((e) => e.toLowerCase());
    input.ingredients = input.ingredients?.map((i) => {
      return { ...i, _id: i._id.toLowerCase() };
    });

    const draft = await MRecipeDraft.findOneAndUpdate(
      { _id, owner: userId },
      { ...updatedValues, updatedAt: new Date() }
    ).lean();

    res.send(draft);
  } catch (error) {
    res.status(401).json({ error });
  }
}
