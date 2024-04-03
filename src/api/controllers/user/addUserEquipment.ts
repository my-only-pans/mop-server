import { Response } from 'express';
import { MUser } from '../../../models/User';
import { AuthenticatedRequest } from '../../../types/CoreTypes';

export default async function addUserEquipment(
  req: AuthenticatedRequest<any, { equipment: string[] }>,
  res: Response
) {
  try {
    const {
      userId,
      body: { equipment },
    } = req;

    let user = await MUser.findById(userId).lean();

    const uniqueEquipment = [
      ...new Set([...(user?.equipment || []), ...equipment]),
    ];

    user = await MUser.findByIdAndUpdate(
      userId,
      { $set: { equipment: uniqueEquipment } },
      { new: true }
    ).lean();

    res.json(user?.equipment);
  } catch (error) {
    res.status(401).json({ error: 'Bad Request' });
  }
}
