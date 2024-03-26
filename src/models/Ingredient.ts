import { ModelOptions, prop } from '@typegoose/typegoose';

@ModelOptions({ schemaOptions: { collection: 'Ingredient' } })
export default class Ingredient {
  @prop({ required: true, unique: true })
  _id!: string;
}
