import { mongoose } from '@typegoose/typegoose';
import initializeDummyData from './initializeDummyData';
import config from '../config';

export default async function initializeApp(): Promise<void> {
  await mongoose.connect(config.DATABASE_URL);

  await initializeDummyData();
}
