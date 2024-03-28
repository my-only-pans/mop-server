import {
  ModelOptions,
  Ref,
  getModelForClass,
  prop,
} from '@typegoose/typegoose';
import { User } from './User';
import { BaseWithTimeStamps } from './Base';

export enum TextBlockType {
  h1 = 'h1',
  h2 = 'h2',
  h3 = 'h3',
  h4 = 'h4',
  h5 = 'h5',
  p = 'p',
}

export class RecipeTextBlock {
  @prop({ required: true, enum: TextBlockType })
  type!: TextBlockType;

  @prop()
  text?: string;
}

export class RecipeIngredient {
  @prop({ required: true })
  _id!: string;

  @prop({ required: true })
  amount!: number;

  @prop({ required: true })
  unit!: string;
}

export class RecipeEquipment {
  @prop({ required: true })
  _id!: string;
}

export class RecipeCategory {
  @prop({ required: true })
  _id!: string;
}

@ModelOptions({ schemaOptions: { collection: 'Recipe' } })
export class Recipe extends BaseWithTimeStamps {
  @prop({ required: true, ref: () => User })
  owner!: Ref<User>;

  @prop({ required: true })
  title!: string;

  @prop({ required: true })
  description!: string;

  @prop({ required: true })
  prepTime!: number;

  @prop({ required: true })
  cookTime!: number;

  @prop({ required: true })
  serving!: number;

  @prop({ required: true, type: () => [RecipeIngredient] })
  ingredients!: RecipeIngredient[];

  @prop({ required: true, type: () => [String] })
  equipment!: string[];

  @prop({ type: () => [String] })
  categories?: string[];

  @prop({ required: true, type: () => [RecipeTextBlock] })
  instructions!: RecipeTextBlock[];
}

export const MRecipe = getModelForClass(Recipe);
