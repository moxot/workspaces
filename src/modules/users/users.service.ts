import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './user.schema';
import { plainToInstance } from 'class-transformer';
import { ObjectId } from 'mongodb';
import { GetUserAggregateDtoResult, GetUserDtoResult } from './dto/get-user.dto';
import * as argon2 from 'argon2';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async create(createUserDto: CreateUserDto) {
    const password = await argon2.hash(createUserDto.password);
    const user = new this.userModel({ ...createUserDto, password });
    await user.save();
  }

  async find(query: any) {
    return this.userModel.findOne(query).lean();
  }

  async findOne(
    userId: string,
    aggregate: boolean,
  ): Promise<GetUserDtoResult | GetUserAggregateDtoResult> {
    if (!aggregate) {
      const user = this.userModel.findById(userId).lean();
      return plainToInstance(GetUserDtoResult, user);
    }
    const userResult = await this.userModel.aggregate([
      {
        $match: {
          _id: new ObjectId(userId),
        },
      },
      {
        $lookup: {
          from: 'workspaces', // Ensure this is the correct collection name
          localField: '_id',
          foreignField: 'user', // Adjusted to match your schema
          as: 'workspaces',
        },
      },
      {
        $unwind: {
          path: '$workspaces',
          preserveNullAndEmptyArrays: true, // Optional, based on your data structure
        },
      },
      {
        $lookup: {
          from: 'messages', // Ensure this is the correct collection name
          localField: 'workspaces._id',
          foreignField: 'workspace', // This should match the reference field in Message schema
          as: 'workspaces.messages',
        },
      },
      {
        $group: {
          _id: '$_id',
          name: { $first: '$name' },
          login: { $first: '$login' },
          password: { $first: '$password' },
          workspaces: { $push: '$workspaces' }, // Reconstruct the workspaces array
        },
      },
    ]);
    return plainToInstance(GetUserAggregateDtoResult, userResult[0]);
  }
}
