import { Request, Response } from 'express';
import { AuthenticatedRequest } from '../../../utils/authMiddleware';
import { MUser } from '../../../models/User';
import { MRecipeDraft } from '../../../models/RecipeDraft';

export default async function createRecipeDraft(
  { body, userId }: AuthenticatedRequest,
  res: Response
) {
  try {
    const user = await MUser.findById(userId);

    console.log(body);

    const draft = (
      await new MRecipeDraft({ owner: userId, ...body }).save()
    ).toObject();
    console.log(draft);
    res.send(draft);
  } catch (error) {
    console.log(error);
    res.sendStatus(401);
  }
}
