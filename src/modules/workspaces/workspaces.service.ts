import { Injectable } from '@nestjs/common';
import { CreateWorkspaceDto } from './dto/create-workspace.dto';
import { UpdateWorkspaceDto } from './dto/update-workspace.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Workspace } from './workspace.schema';
import { ObjectId } from 'mongodb';

@Injectable()
export class WorkspacesService {
  constructor(@InjectModel(Workspace.name) private workspaceModel: Model<Workspace>) {}
  async create(createWorkspaceDto: CreateWorkspaceDto) {
    await this.workspaceModel.create(createWorkspaceDto);
  }

  async findAll() {
    return this.workspaceModel.find();
  }

  async findOne(id: string) {
    return this.workspaceModel.findOne({ _id: new ObjectId(id) });
  }

  async update(id: number, updateWorkspaceDto: UpdateWorkspaceDto) {
    return this.workspaceModel.updateOne({ _id: new ObjectId(id) }, updateWorkspaceDto);
  }

  async remove(id: number) {
    return this.workspaceModel.deleteOne({ _id: new ObjectId(id) });
  }
}
