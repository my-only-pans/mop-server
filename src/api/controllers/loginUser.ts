import { MUser } from '../../models/User';
import createJwt from '../../utils/user/createJwt';
import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
interface LoginInputType {
  email: string;
  password: string;
}

export default async function (req: Request, res: Response) {
  try {
    const input = req.body as LoginInputType;

    const { email, password } = input;

    const user = await MUser.findOne({ email }).lean();

    if (!user) {
      return res.status(401).json('Invalid user credentials');
    }

    const match = await bcrypt.compare(password, user?.password);

    if (!match) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const authToken = await createJwt(user._id.toString());

    res.send({ authToken });
  } catch (error) {
    console.log(error);
    res.status(500).json('Something went wrong');
  }
}
