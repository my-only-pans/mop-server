import config from "../../config";
import { MUser, User } from "../../models/User";
import jwt from "jsonwebtoken";
import createJwt from "../../utils/user/createJwt";
import { Request, Response } from "express";
import isEmail from "../../utils/user/isEmail";

interface LoginInputType {
  login: string;
  password: string;
}

export default async function (req: Request, res: Response) {
  try {
    const input = req.body as LoginInputType;
    const { login, password } = input;

    if (!login) {
      return res.status(401).json("Username or Email is required");
    } else if (!password) {
      return res.status(401).json("Password is required");
    }

    let user: User | null;

    if (isEmail(login)) {
      user = await MUser.findOne({ email: login }).lean();
    } else {
      user = await MUser.findOne({ username: login }).lean();
    }

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
