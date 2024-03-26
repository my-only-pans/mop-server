import { ModelOptions, prop } from '@typegoose/typegoose';

@ModelOptions({ schemaOptions: { collection: 'Ingredient' } })
export default class Ingredient {
  @prop({ required: true, unique: true })
  _id!: string;
}

export class RecipeIngredient {
  @prop({ required: true })
  _id!: string;

  @prop({ required: true })
  amount!: number;

  @prop({ required: true })
  unit!: string;
}
