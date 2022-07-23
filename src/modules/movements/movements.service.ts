import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types as MongooseTypes } from 'mongoose';

import { Movement, MovementDocument } from './model/movement.model';
import { UpdateMovementInput, CreateMovementInput } from './dto/movements.input.dto';

@Injectable()
export class MovementsService {
  constructor(@InjectModel(Movement.name) private accountModel: Model<MovementDocument>) {}

  async findAll(): Promise<Movement[]> {
    try {
      return await this.accountModel.find({}).sort({ name: 1 });
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async findById(id: MongooseTypes.ObjectId): Promise<Movement> {
    try {
      const category = await this.accountModel.findById(id).exec();
      if (!!category) return category;
      throw new NotFoundException(`Account #${id} not found`);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async create(data: CreateMovementInput): Promise<Movement> {
    try {
      const newCategory = new this.accountModel(data);
      return await newCategory.save();
    } catch (error) {
      console.error(error);
      throw new BadRequestException();
    }
  }

  async update(id: MongooseTypes.ObjectId, data: UpdateMovementInput): Promise<Movement> {
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
