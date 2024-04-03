import { ModelOptions, getModelForClass, prop } from '@typegoose/typegoose';
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

  @prop({ type: () => [String], default: () => [] })
  equipment?: string[];

  @prop({ type: () => [String] })
  allergens?: string[];

  @prop({ type: () => [String], default: () => [] })
  ingredients?: string[];

  @prop({ type: () => [String], default: () => [] })
  savedRecipes?: string[];
}

export const MUser = getModelForClass(User);
