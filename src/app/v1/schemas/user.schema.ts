import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema({ timestamps: true, versionKey: false })
export class User {
  @Prop({ required: true, index: { unique: true } })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ default: false })
  isDisabled: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);
