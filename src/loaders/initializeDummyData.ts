import createUser from '../api/user/utils/createUser';
import config from '../config';
import { MUser } from '../models/User';

export default async function initializeDummyData (): Promise<void> {
  const adminExists = await MUser.countDocuments({ email: 'admin@email.com' }).lean();

  if (adminExists) return;

  await createUser({
    firstName: 'Admin',
    lastName: 'Admin',
    username: 'mop-admin',
    email: 'admin@email.com',
    password: config.DEFAULT_ADMIN_PASSWORD,
    confirmPassword: config.DEFAULT_ADMIN_PASSWORD
  });
}
