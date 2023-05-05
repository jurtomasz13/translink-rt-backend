import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Schema as MoongoseSchema } from 'mongoose';
import { Task } from '../tasks/tasks.schema';

export type UserDocument = HydratedDocument<User>;

@Schema({ timestamps: true, versionKey: false })
export class User {
  @Prop({ required: true, index: { unique: true } })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ default: false })
  isDisabled: boolean;

  @Prop({ type: [{ type: MoongoseSchema.Types.ObjectId, ref: 'Task' }] })
  tasks: Task[];
}

export const UserSchema = SchemaFactory.createForClass(User);
