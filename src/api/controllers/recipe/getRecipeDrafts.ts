import { Response } from 'express';
import { AuthenticatedRequest } from '../../../types/CoreTypes';
import { MRecipeDraft } from '../../../models/Recipe';

export default async function getRecipeDrafts(
  req: AuthenticatedRequest,
  res: Response
) {
  try {
    const { userId } = req;

    if (!userId) return res.status(400).json({ error: 'Forbidden' });

    const drafts = await MRecipeDraft.find({ owner: userId }).lean();

    res.json(drafts);
  } catch (error) {
    res.status(400).json({
      error: 'Bad Request',
    });
  }
}
