import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Schema as MongooseSchema } from 'mongoose';
import { User } from '../users/user.schema';
import { Expose } from 'class-transformer';

@Schema({ collection: 'workspaces', timestamps: true, versionKey: false })
export class Workspace {
  @Expose()
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User' })
  user: User;

  @Expose()
  @Prop({ required: true })
  name: string;
}

export const WorkspaceSchema = SchemaFactory.createForClass(Workspace);
