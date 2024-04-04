import {
  ModelOptions,
  Ref,
  getModelForClass,
  prop,
} from '@typegoose/typegoose';
import { BaseWithTimeStamps } from './Base';
import { Recipe } from './Recipe';

@ModelOptions({ schemaOptions: { collection: 'User' } })
export class User extends BaseWithTimeStamps {
  @prop({ required: true, unique: true })
  username!: string;

  @prop({ required: true, unique: true })
  email!: string;

  @prop({ required: true })
  phone!: string;

  @prop({ required: true })
  password!: string;

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

  @prop({ default: () => [] })
  savedRecipes?: Ref<Recipe>[];
}

export const MUser = getModelForClass(User);
