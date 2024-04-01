import { Response } from 'express';
import { AuthenticatedRequest } from '../../../types/CoreTypes';
import { MRecipeDraft } from '../../../models/Recipe';

type GetDraftQueryType = {
  draftId: string;
};

export default async function (
  req: AuthenticatedRequest<GetDraftQueryType>,
  res: Response
) {
  try {
    const {
      userId,
      params: { _id },
    } = req;

    const draft = await MRecipeDraft.findOne({
      _id: _id,
      owner: userId,
    })
      .populate('owner', { _id: 1, username: 1 })
      .lean();

    if (!draft) {
      return res.status(401).json({ error: 'Recipe Draft not found.' });
    }
    res.json(draft);
  } catch (error) {
    res.status(400).json({ error: 'Recipe draft not found' });
  }
}
