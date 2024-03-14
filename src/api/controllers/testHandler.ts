import { Request, Response } from 'express';
import { MUser } from '../../models/User';

const testHandler = async (req: Request, res: Response) => {
  const user = await MUser.findById(req.query._id).lean();

  console.log(user);

  return res.send(user); // Everytime you want to return something to the client, use res.send();
};

export default testHandler;
