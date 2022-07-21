import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types as MongooseTypes } from 'mongoose';

import { Account, AccountDocument } from './model/account.model';
import { CreateAccountInput, UpdateAccountInput } from './dto/accounts.input.dto';

@Injectable()
export class AccountsService {
  constructor(@InjectModel(Account.name) private accountModel: Model<AccountDocument>) {}

  async findAll(): Promise<Account[]> {
    try {
      return await this.accountModel.find({}).sort({ name: 1 });
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async findById(id: MongooseTypes.ObjectId): Promise<Account> {
    try {
      const category = await this.accountModel.findById(id).exec();
      if (!!category) return category;
      throw new NotFoundException(`Account #${id} not found`);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async create(data: CreateAccountInput): Promise<Account> {
    try {
      const newCategory = new this.accountModel(data);
      return await newCategory.save();
    } catch (error) {
      console.error(error);
      throw new BadRequestException();
    }
  }

  async update(id: MongooseTypes.ObjectId, data: UpdateAccountInput): Promise<Account> {
    try {
      const category = await this.accountModel
        .findByIdAndUpdate(id, { $set: data }, { new: true })
        .sort({ name: 1 })
        .exec();
      if (!category) throw new NotFoundException(`Account #${id} not found`);
      return category;
    } catch (error) {
      console.error(error);
      throw new BadRequestException(error);
    }
  }

  async delete(id: MongooseTypes.ObjectId) {
    const category = await this.findById(id);
    if (!category) throw new NotFoundException(`Account #${id} not found`);

    return this.accountModel.findByIdAndDelete(id);
  }
}
