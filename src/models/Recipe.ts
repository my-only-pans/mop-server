import {
  ModelOptions,
  Ref,
  getModelForClass,
  prop,
} from '@typegoose/typegoose';
import Base from './Base';
import { User } from './User';

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
export class Recipe extends Base {
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

  @prop({ required: true, type: () => [RecipeEquipment] })
  equipment!: RecipeEquipment[];

  @prop({ type: () => [RecipeCategory] })
  categories?: RecipeCategory[];

  @prop({ required: true })
  instructions!: string;
}

export const MRecipe = getModelForClass(Recipe);
