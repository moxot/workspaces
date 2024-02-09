import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Schema as MongooseSchema } from 'mongoose';
import { Workspace } from '../workspaces/workspace.schema';

@Schema({ collection: 'messages', timestamps: true, versionKey: false })
export class Message {
  @Prop({ required: true })
  date: Date;

  @Prop({ required: true, default: 0 })
  likes: number;

  @Prop({ required: true, index: 'text' })
  content: string;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Workspace' })
  workspace: Workspace;
}

export const MessageSchema = SchemaFactory.createForClass(Message);
