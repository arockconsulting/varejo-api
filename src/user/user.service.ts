/*
https://docs.nestjs.com/providers#services
*/

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from 'src/infra/entities/user,schema';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async findOne(username: string): Promise<User | undefined> {
    return this.userModel.findOne({ username }).exec();
  }

  async findOneById(id: any): Promise<User | undefined> {
    return this.userModel.findOne({ _id: id }).exec();
  }

  async findAll(): Promise<User[] | undefined> {
    return this.userModel.find().exec();
  }
  async createUser(username: string, password: string): Promise<User> {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new this.userModel({ username, password: hashedPassword });
    return newUser.save();
  }

  async seedAdminUser() {
    const existingAdmin = await this.userModel
      .findOne({ username: 'admin' })
      .exec();
    if (!existingAdmin) {
      await this.createUser('admin', 'admin123');
      console.log('Admin user created: admin/admin123');
    }
  }
}
