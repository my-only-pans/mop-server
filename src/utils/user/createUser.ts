import { MUser } from "../../models/User";
import hashPassword from "./hashPassword";

interface CreateUserInputType {
  email: string;
  password: string;
  confirmPassword: string;
  username: string;
  firstName: string;
  lastName: string;
}

export default async function createUser(
  input: CreateUserInputType
): Promise<string> {
  if (!input) {
    throw new Error("input is required");
  }

  const { email, password, confirmPassword, username, firstName, lastName } =
    input;

  if (!email) {
    throw new Error("Email is required");
  } else if (!password) {
    throw new Error("Password is required");
  } else if (!confirmPassword) {
    throw new Error("Please confirm password");
  } else if (!username) {
    throw new Error("Username is required");
  } else if (!firstName) {
    throw new Error("First Name is required");
  } else if (!lastName) {
    throw new Error("Last Name is required");
  }

  const emailUsed = !!(await MUser.countDocuments({ email }));

  if (emailUsed) {
    throw new Error("Email already used");
  }

  const usernameUsed = !!(await MUser.countDocuments({ username }));

  if (usernameUsed) {
    throw new Error("Username is already taken");
  }

  if (password !== confirmPassword) {
    throw new Error("Password must match");
  }

  const hashedPassword = await hashPassword(password);

  const newUser = new MUser({
    firstName,
    lastName,
    username,
    email,
    password: hashedPassword,
  });

  await newUser.save();

  return newUser._id.toString();
}
