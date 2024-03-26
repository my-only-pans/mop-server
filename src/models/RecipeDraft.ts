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

@ModelOptions({ schemaOptions: { collection: 'RecipeDraft' } })
export class RecipeDraft extends Base {
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

  @prop({ type: () => [RecipeIngredient] })
  ingredients?: RecipeIngredient[];

  @prop({ type: () => [Equipment] })
  equipment?: Equipment[];

  @prop({ type: () => [Category] })
  categories?: Category[];

  @prop()
  instructions?: string;
}

export const MRecipeDraft = getModelForClass(RecipeDraft);
