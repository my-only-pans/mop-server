import { ModelOptions, prop } from '@typegoose/typegoose';

@ModelOptions({ schemaOptions: { collection: 'Equipment' } })
export default class Equipment {
  @prop({ required: true, unique: true })
  _id!: string;
}
