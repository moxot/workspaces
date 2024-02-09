import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './user.schema';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async findOne(userId: string): Promise<User | undefined> {
    const userRsult = await this.userModel.aggregate([
      {
        $match: {
          _id: userId,
        },
      },
      {
        $lookup: {
          from: 'workspaces',
          localField: '_id',
          foreignField: 'userId',
          as: 'workspaces',
        },
      },
      {
        $unwind: '$workspaces',
      },
      {
        $lookup: {
          from: 'messages',
          localField: 'workspaces._id',
          foreignField: 'workspaceId',
          as: 'workspaces.messages',
        },
      },
      {
        $group: {
          _id: '$_id',
          name: { $first: '$name' },
          login: { $first: '$login' },
          password: { $first: '$password' },
          workspaces: { $push: '$workspaces' },
        },
      },
    ]);
    return userRsult[0];
  }
}
