import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Group } from '../infra/entities/group.schema';

@Injectable()
export class GroupService {
  constructor(@InjectModel(Group.name) private groupModel: Model<Group>) {}

  async create(data: Partial<Group>): Promise<Group> {
    const newGroup = new this.groupModel(data);
    return await newGroup.save();
  }

  async findAll(): Promise<Group[]> {
    return await this.groupModel.find().exec();
  }

  async findOne(id: string): Promise<Group> {
    const group = await this.groupModel.findById(id).exec();
    if (!group) {
      throw new NotFoundException('Group not found');
    }
    return group;
  }

  async update(id: string, data: Partial<Group>): Promise<Group> {
    const updatedGroup = await this.groupModel
      .findByIdAndUpdate(id, data, { new: true })
      .exec();
    if (!updatedGroup) {
      throw new NotFoundException('Group not found');
    }
    return updatedGroup;
  }

  async delete(id: string): Promise<void> {
    const result = await this.groupModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new NotFoundException('Group not found');
    }
  }
}
