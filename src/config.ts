import { cleanEnv, str, num, url } from 'envalid';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

const config = cleanEnv(process.env, {
  PORT: num({ default: 3000 }),
  JWT_SECRET: str({ default: 'CHANGE_ME' }),
  DATABASE_URL: url({ default: 'mongodb://localhost:27017/my-only-pans' }),
  DEFAULT_ADMIN_PASSWORD: str({ default: 'password123' })
});

export default config;
