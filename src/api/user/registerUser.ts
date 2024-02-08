import { MUser } from '../../models/User';
import hashPassword from '../../utils/user/hashPassword';

interface RegisterUserInputType {
  email: string
  password: string
  confirmPassword: string
  username: string
  firstName: string
  lastName: string
}

export default async function registerUser (input: RegisterUserInputType): Promise<string> {
  const { email, password, confirmPassword, username, firstName, lastName } = input;

  const emailUsed = !!(await MUser.countDocuments({ email }));

  if (emailUsed) {
    throw new Error('Email already used');
  }

  if (password !== confirmPassword) {
    throw new Error('Password must match');
  }

  const hashedPassword = await hashPassword(password);

  const newUser = new MUser({
    firstName,
    lastName,
    username,
    email,
    password: hashedPassword
  });

  await newUser.save();

  return newUser._id.toString();
}
