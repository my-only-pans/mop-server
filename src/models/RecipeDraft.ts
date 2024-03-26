import {
  ModelOptions,
  Ref,
  getModelForClass,
  prop,
} from '@typegoose/typegoose';
import { User } from './User';
import { RecipeCategory, RecipeEquipment, RecipeIngredient } from './Recipe';
import { BaseWithTimeStamps } from './Base';

@ModelOptions({ schemaOptions: { collection: 'RecipeDraft' } })
export class RecipeDraft extends BaseWithTimeStamps {
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

  @prop({ type: () => [String] })
  equipment?: string[];

  @prop({ type: () => [String] })
  categories?: string[];

  @prop()
  instructions?: string;
}

export const MRecipeDraft = getModelForClass(RecipeDraft);
