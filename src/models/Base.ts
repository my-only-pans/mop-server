import { prop, mongoose } from "@typegoose/typegoose";

export default class Base {
  @prop({ type: () => String, default: () => new mongoose.Types.ObjectId() })
  _id!: mongoose.Types.ObjectId;
}
