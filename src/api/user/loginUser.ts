import config from "../../config";
import { MUser } from "../../models/User";
import jwt from "jsonwebtoken";
import createJwt from "./utils/createJwt";
import { Request, Response } from "express";

interface LoginInputType {
  username?: string;
  email?: string;
  password: string;
}

export default async function (req: Request, res: Response) {
  try {
    const input = req.body as LoginInputType;
    const { username, email, password } = input;

    if (!username && !email) {
      return res.status(401).json("Username or Email is required");
    } else if (!password) {
      return res.status(401).json("Password is required");
    }

    const user = await MUser.findOne(
      { $or: [{ username }, { email }] },
      { _id: 1 }
    ).lean();

    if (!user) {
      return res.status(401).json("Invalid user credentials");
    }

    const authToken = await createJwt(user._id.toString());

    res.send({ authToken });
  } catch (error) {
    console.log(error);
    res.status(500).json("Something went wrong");
  }
}
