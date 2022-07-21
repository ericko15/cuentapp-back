import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Category, CategorySchema } from './model/category.model';
import { ObjectIdScalar } from 'src/common/scalars/object-id.scalar';
import { CategoriesService } from './categories.service';
import { CategoriesResolver } from './categories.resolver';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Category.name,
        schema: CategorySchema,
      },
    ]),
  ],
  providers: [ObjectIdScalar, CategoriesService, CategoriesResolver],
})
export class CategoriesModule {}
