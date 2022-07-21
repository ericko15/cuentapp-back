import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Category } from './model/category.model';
import { CategoriesService } from './categories.service';
import { ObjectIdScalar } from 'src/common/scalars/object-id.scalar';

import { Types as MongooseTypes } from 'mongoose';
import { CreateCategoryInput, UpdateCategoryInput } from './dto/categories.input.dto';

@Resolver(() => Category)
export class CategoriesResolver {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Query(() => [Category])
  async categories(): Promise<Category[]> {
    return await this.categoriesService.findAll();
  }

  @Query(() => Category, { nullable: true })
  async category(@Args('id', { type: () => ObjectIdScalar }) _id: MongooseTypes.ObjectId): Promise<Category> {
    return await this.categoriesService.findById(_id);
  }

  @Mutation(() => Category)
  async createCategory(
    @Args({ name: 'category', type: () => CreateCategoryInput })
    categoryData: CreateCategoryInput,
  ) {
    return await this.categoriesService.create(categoryData);
  }

  @Mutation(() => Category)
  async updateCategory(
    @Args({ name: 'category', type: () => UpdateCategoryInput })
    categoryData: UpdateCategoryInput,
    @Args({ name: 'id', type: () => ObjectIdScalar })
    id: MongooseTypes.ObjectId,
  ) {
    return await this.categoriesService.update(id, categoryData);
  }

  @Mutation(() => Category)
  async removeCategory(
    @Args({ name: 'id', type: () => ObjectIdScalar })
    id: MongooseTypes.ObjectId,
  ) {
    return await this.categoriesService.delete(id);
  }
}
