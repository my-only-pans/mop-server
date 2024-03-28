import { ModelOptions, prop } from '@typegoose/typegoose';

@ModelOptions({ schemaOptions: { collection: 'Category' } })
export default class Category {
  @prop({ required: true, unique: true })
  _id!: string;
}
