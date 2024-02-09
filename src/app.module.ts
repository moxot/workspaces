import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './modules/users/users.module';
import { WorkspacesModule } from './modules/workspaces/workspaces.module';
import { MessagesModule } from './modules/messages/messages.module';
import * as dotenv from 'dotenv';
dotenv.config();
@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGODB_URI, {
      user: process.env.MONGODB_USER,
      pass: process.env.MONGODB_PASSWORD,
      dbName: process.env.MONGODB_DB,
    }),
    UsersModule,
    WorkspacesModule,
    MessagesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
