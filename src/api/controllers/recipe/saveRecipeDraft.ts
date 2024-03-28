import { Response } from 'express';
import { MRecipeDraft, RecipeDraft } from '../../../models/RecipeDraft';
import { AuthenticatedRequest } from '../../../types/CoreTypes';

export default async function saveRecipeDraft(
  req: AuthenticatedRequest<any, RecipeDraft>,
  res: Response
) {
  try {
    const { _id, ...input } = req.body;

    const updatedValues = { ...input };

    input.equipment = input.equipment?.map((e) => e.toLowerCase());
    input.ingredients = input.ingredients?.map((i) => {
      return { ...i, _id: i._id.toLowerCase() };
    });

    const draft = await MRecipeDraft.findByIdAndUpdate(
      _id,
      updatedValues
    ).lean();

    res.send(draft);
  } catch (error) {
    res.status(401).json({ error });
  }
}
