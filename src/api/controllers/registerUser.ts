import { type Request, type Response } from 'express';
import getErrorMessage from '../../utils/getErrorMessage';
import createJwt from '../../utils/user/createJwt';
import { MUser } from '../../models/User';
import hashPassword from '../../utils/user/hashPassword';

export default async function registerUser(req: Request, res: Response) {
  try {
    const { body: input } = req;

    if (!input) {
      return res.status(400).send('Input is required');
    }

    const {
      email,
      password,
      confirmPassword,
      username,
      firstName,
      lastName,
      phone,
    } = input;

    if (!email) {
      return res.status(400).send('Email is required');
    } else if (!password) {
      return res.status(400).send('Password is required');
    } else if (!confirmPassword) {
      return res.status(400).send('Please confirm password');
    } else if (!username) {
      return res.status(400).send('Username is required');
    } else if (!firstName) {
      return res.status(400).send('First Name is required');
    } else if (!lastName) {
      return res.status(400).send('Last Name is required');
    } else if (!phone) {
      return res.status(400).send('Phone Number is required');
    }

    const emailUsed = !!(await MUser.countDocuments({ email }));

    if (emailUsed) {
      return res.status(400).send('Email already used');
    }

    const usernameUsed = !!(await MUser.countDocuments({ username }));

    if (usernameUsed) {
      return res.status(400).send('Username is already taken');
    }

    if (password !== confirmPassword) {
      return res.status(400).send('Password must match');
    }

    const hashedPassword = await hashPassword(password);

    const newUser = new MUser({
      firstName,
      lastName,
      username,
      email,
      phone,
      password: hashedPassword,
    });

    await newUser.save();

    const userId = newUser._id.toString();

    const authToken = await createJwt(userId);

    return res.status(201).json({ authToken });
  } catch (error) {
    return res.status(500).send(getErrorMessage(error));
  }
}
