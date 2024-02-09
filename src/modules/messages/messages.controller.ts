import { Controller, Get, Post, Body, Patch, Param, Delete, Query, HttpCode } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { CreateMessageDto, CreateMessageDtoResult } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { GetMessagesFilterDto } from './dto/get-messages-filter.dto';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { TextSearchDtoResult } from './dto/text-search.dto';

@ApiTags('Messages')
@Controller('messages')
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}

  @HttpCode(201)
  @Post()
  async create(@Body() createMessageDto: CreateMessageDto) {
    return this.messagesService.create(createMessageDto);
  }

  @ApiOkResponse({ type: [CreateMessageDtoResult] })
  @Get()
  async findAll(@Query() filter: GetMessagesFilterDto): Promise<CreateMessageDtoResult> {
    return this.messagesService.findAll(filter);
  }

  @ApiOkResponse({ type: TextSearchDtoResult })
  @Get('text-search')
  async textSearch(@Query('text') text: string) {
    return this.messagesService.textSearch(text);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.messagesService.findOne(id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateMessageDto: UpdateMessageDto) {
    return this.messagesService.update(id, updateMessageDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.messagesService.remove(id);
  }
}
