import { Injectable } from '@nestjs/common';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Message } from './message.schema';

@Injectable()
export class MessagesService {
  constructor(@InjectModel(Message.name) private messageModel: Model<Message>) {}
  async create(createMessageDto: CreateMessageDto) {
    await this.messageModel.create(createMessageDto);
  }

  async findAll() {
    return `This action returns all messages`;
  }

  async findOne(id: string) {
    return `This action returns a #${id} message`;
  }

  async update(id: string, updateMessageDto: UpdateMessageDto) {
    return `This action updates a #${id} message`;
  }

  async remove(id: string) {
    return `This action removes a #${id} message`;
  }
}
