import { ModelOptions, getModelForClass, prop } from '@typegoose/typegoose';
import { ObjectId } from 'mongoose';
import { BaseWithTimeStamps } from './Base';

@ModelOptions({ schemaOptions: { collection: 'User' } })
export class User extends BaseWithTimeStamps {
  @prop({ required: true, unique: true })
  uid!: string;

  @prop({ required: true, unique: true })
  username!: string;

  @prop({ required: true, unique: true })
  email!: string;

  @prop({ required: true })
  firstName!: string;

  @prop({ required: true })
  lastName!: string;

  @prop({ type: () => [String] })
  equipment?: string[];

  @prop({ type: () => [String] })
  allergens?: string[];

  @prop({ type: () => [String] })
  availableIngredients?: string[];
}

export const MUser = getModelForClass(User);
