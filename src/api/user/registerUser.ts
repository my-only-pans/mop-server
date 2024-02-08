import { type Request, type Response } from "express";
import createUser from "./utils/createUser";
import getErrorMessage from "../../utils/getErrorMessage";
import createJwt from "./utils/createJwt";

export default async function registerUser(
  req: Request,
  res: Response
): Promise<void> {
  try {
    const { body: input } = req;

    const userId = await createUser(input);

    const authToken = await createJwt(userId);

    res.status(201).json({ authToken });
  } catch (error) {
    res.status(500).json(getErrorMessage(error));
  }
}
