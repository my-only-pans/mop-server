import { prop, mongoose } from '@typegoose/typegoose';

export default class Base {
  @prop({
    type: () => mongoose.Types.ObjectId,
    default: () => new mongoose.Types.ObjectId(),
  })
  _id!: mongoose.Types.ObjectId;
}
