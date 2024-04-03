import { Response } from 'express';
import { MUser } from '../../../models/User';
import { AuthenticatedRequest } from '../../../types/CoreTypes';

export default async function removeUserEquipment(
  req: AuthenticatedRequest<any, { equipment: string }>,
  res: Response
) {
  const {
    userId,
    body: { equipment },
  } = req;

  try {
    const user = await MUser.findByIdAndUpdate(
      userId,
      { $pull: { equipment } },
      { new: true }
    ).lean();

    res.json(user?.equipment);
  } catch (error) {
    console.log(error);
    res.status(401).json({ error: 'Bad Request' });
  }
}
