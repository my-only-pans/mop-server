import { type Request, type Response } from 'express';
import createUser from '../../utils/user/createUser';
import getErrorMessage from '../../utils/getErrorMessage';
import createJwt from '../../utils/user/createJwt';

export default async function createRecipe(
  req: Request,
  res: Response
): Promise<void> {
  try {
    const { body: input } = req;

    const { email, password } = req.body;

    const userId = await createUser(input);

    const authToken = await createJwt(userId);

    res.status(201).json({ authToken });
  } catch (error) {
    res.status(500).json(getErrorMessage(error));
  }
}
