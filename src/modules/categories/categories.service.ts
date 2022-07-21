import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types as MongooseTypes } from 'mongoose';

import { Category, CategoryDocument } from './model/categories.model';
import { CreateCategoryInput, UpdateCategoryInput } from './dto/categories.input.dto';

@Injectable()
export class CategoriesService {
  constructor(@InjectModel(Category.name) private categoryModel: Model<CategoryDocument>) {}

  async findAll(): Promise<Category[]> {
    try {
      return await this.categoryModel.find({}).sort({ name: 1 });
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async findById(id: MongooseTypes.ObjectId): Promise<Category> {
    try {
      const category = await this.categoryModel.findById(id).exec();
      if (!!category) return category;
      throw new NotFoundException(`Category #${id} not found`);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async create(data: CreateCategoryInput): Promise<Category> {
    try {
      const newCategory = new this.categoryModel(data);
      return await newCategory.save();
    } catch (error) {
      console.error(error);
      throw new BadRequestException();
    }
  }

  async update(id: MongooseTypes.ObjectId, data: UpdateCategoryInput): Promise<Category> {
    try {
      const category = await this.categoryModel
        .findByIdAndUpdate(id, { $set: data }, { new: true })
        .sort({ name: 1 })
        .exec();
      if (!category) throw new NotFoundException(`Category #${id} not found`);
      return category;
    } catch (error) {
      console.error(error);
      throw new BadRequestException(error);
    }
  }

  async delete(id: MongooseTypes.ObjectId) {
    const category = await this.findById(id);
    if (!category) throw new NotFoundException(`Category #${id} not found`);

    return this.categoryModel.findByIdAndDelete(id);
  }
}
