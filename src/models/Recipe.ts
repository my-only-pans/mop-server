import {
  ModelOptions,
  Ref,
  getModelForClass,
  prop,
} from '@typegoose/typegoose';
import Base from './Base';
import { User } from './User';
import { RecipeIngredient } from './Ingredient';
import Equipment from './Equipment';
import Category from './Category';

@ModelOptions({ schemaOptions: { collection: 'Recipe' } })
export class Recipe extends Base {
  @prop({ required: true, ref: () => User })
  owner!: Ref<User>;

  @prop({ required: true, unique: true })
  title!: string;

  @prop({ required: true, unique: true })
  description!: string;

  @prop({ required: true })
  prepTime!: number;

  @prop({ required: true })
  cookTime!: number;

  @prop({ required: true })
  serving!: number;

  @prop({ required: true, type: () => [RecipeIngredient] })
  ingredients!: RecipeIngredient[];

  @prop({ required: true, type: () => [Equipment] })
  equipment!: Equipment[];

  @prop({ type: () => [Category] })
  categories?: Category[];

  @prop({ required: true })
  instructions!: string;
}

export const MRecipe = getModelForClass(Recipe);
