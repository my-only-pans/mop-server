import createUser from '../utils/user/createUser';
import config from '../config';
import { MUser } from '../models/User';

export default async function initializeDummyData(): Promise<void> {
  const adminExists = await MUser.countDocuments({
    email: config.DEFAULT_ADMIN_EMAIL,
  }).lean();

  if (adminExists) return;

  await createUser({
    firstName: 'Admin',
    lastName: 'Admin',
    username: config.DEFAULT_ADMIN_USERNAME,
    email: config.DEFAULT_ADMIN_EMAIL,
    password: config.DEFAULT_ADMIN_PASSWORD,
    confirmPassword: config.DEFAULT_ADMIN_PASSWORD,
  });
}
