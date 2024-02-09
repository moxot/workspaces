import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Schema as MongooseSchema } from 'mongoose';
import { User } from '../users/user.schema';

@Schema({ collection: 'workspaces', timestamps: true, versionKey: false })
export class Workspace {
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User' })
  userId: User;

  @Prop({ required: true })
  name: string;
}

export const WorkspaceSchema = SchemaFactory.createForClass(Workspace);
