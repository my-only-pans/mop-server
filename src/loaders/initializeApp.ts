import { mongoose } from '@typegoose/typegoose';
import initializeDummyData from './initializeDummyData';

export default async function initializeApp (): Promise<void> {
  await mongoose.connect('mongodb://localhost:27017/my-only-pans');

  await initializeDummyData();
}
