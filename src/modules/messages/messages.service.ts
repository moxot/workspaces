import { Injectable } from '@nestjs/common';
import { CreateMessageDto, CreateMessageDtoResult } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Message } from './message.schema';
import { GetMessagesFilterDto } from './dto/get-messages-filter.dto';
import { plainToInstance } from 'class-transformer';
import { ObjectId } from 'mongodb';
import { TextSearchDtoResult } from './dto/text-search.dto';

@Injectable()
export class MessagesService {
  constructor(@InjectModel(Message.name) private messageModel: Model<Message>) {}
  async create(createMessageDto: CreateMessageDto) {
    await this.messageModel.create(createMessageDto);
  }

  async findAll(filter: GetMessagesFilterDto) {
    const query: { date?: { $gte: Date; $lt: Date }; likes?: number } = {};
    if (filter.date) {
      query.date = this.constructDateFilter(filter.date);
    }
    if (filter.likes) {
      query.likes = filter.likes;
    }
    const result = this.messageModel.find(query).populate('workspace').lean();
    return plainToInstance(CreateMessageDtoResult, result);
  }

  async findOne(id: string) {
    return this.messageModel.findById(id).lean();
  }

  async textSearch(text: string) {
    const result = this.messageModel.find({ $text: { $search: text } }).lean();
    return plainToInstance(TextSearchDtoResult, result);
  }

  async update(id: string, updateMessageDto: UpdateMessageDto) {
    return this.messageModel.updateOne({ _id: new ObjectId(id) }, updateMessageDto);
  }

  async remove(id: string) {
    return this.messageModel.deleteOne({ _id: new ObjectId(id) });
  }

  constructDateFilter(date: Date) {
    const startDate = new Date(date);
    startDate.setUTCHours(0, 0, 0, 0);
    const endDate = new Date(startDate);
    endDate.setUTCDate(startDate.getUTCDate() + 1);
    return { $gte: startDate, $lt: endDate };
  }
}
