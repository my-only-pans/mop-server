import { Request, Response } from 'express';

export default async function createRecipeDraft(req: Request, res: Response) {
  const authToken = req.headers.authorization;
  console.log(req.body);

  res.send(authToken);
}
