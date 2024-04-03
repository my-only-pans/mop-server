import { prop, mongoose } from '@typegoose/typegoose';

export class Base {
  @prop({
    type: () => mongoose.Types.ObjectId,
    default: () => new mongoose.Types.ObjectId(),
  })
  _id!: mongoose.Types.ObjectId;
}

export class BaseWithTimeStamps {
  @prop({
    type: () => mongoose.Types.ObjectId,
    default: () => new mongoose.Types.ObjectId(),
  })
  _id!: mongoose.Types.ObjectId;

  @prop({
    type: () => Date,
    default: () => Date.now(),
  })
  createdAt!: Date;

  @prop({
    type: () => Date,
    default: () => Date.now(),
  })
  updatedAt!: Date;
}
