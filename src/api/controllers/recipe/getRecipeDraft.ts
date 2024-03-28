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
  const {
    userId,
    query: { draftId },
  } = req;

  const draft = await MRecipeDraft.findOne({
    _id: draftId,
    owner: userId,
  }).lean();

  if (!draft) {
    return res.status(401).json({ error: 'Recipe Draft not found.' });
  }
  res.json(draft);
}
