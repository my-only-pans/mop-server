import config from '../../config';
import { MUser } from '../../models/User';
import createJwt from '../../utils/user/createJwt';
import { Request, Response } from 'express';
import firebaseAdmin from '../../utils/firebaseAdmin';

interface LoginInputType {
  firebaseToken: string;
}

export default async function (req: Request, res: Response) {
  try {
    const input = req.body as LoginInputType;
    const { firebaseToken } = input;

    const { uid } = await firebaseAdmin.auth().verifyIdToken(firebaseToken);

    const user = await MUser.findOne({ uid }).lean();

    if (!user) {
      return res.status(401).json('Invalid user credentials');
    }

    const authToken = await createJwt(user._id.toString());

    res.send({ authToken });
  } catch (error) {
    console.log(error);
    res.status(500).json('Something went wrong');
  }
}
