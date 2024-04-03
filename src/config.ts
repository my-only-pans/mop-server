import { cleanEnv, str, num, url, email } from 'envalid';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

const config = cleanEnv(process.env, {
  PORT: num({ default: 3000 }),
  JWT_SECRET: str({ default: 'CHANGE_ME' }),
  DATABASE_URL: url({ default: 'mongodb://localhost:27017/my-only-pans' }),
  DEFAULT_ADMIN_USERNAME: str(),
  DEFAULT_ADMIN_EMAIL: email(),
  DEFAULT_ADMIN_PASSWORD: str({ default: 'password123' }),
  DEFAULT_ADMIN_PHONE: str({ default: '1234567890' }),
  // FIREBASE
  SERVICE_PROJECT_ID: str(),
  SERVICE_ACCOUNT_PRIVATE_KEY: str(),
  SERVICE_ACCOUNT_CLIENT_EMAIL: str(),
});

export default config;
