import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Field, ObjectType } from '@nestjs/graphql';
import { Document, Types as MongooseTypes } from 'mongoose';

import { ObjectIdScalar } from 'src/common/scalars/object-id.scalar';

@ObjectType()
@Schema({
  timestamps: true,
})
export class Category {
  @Field(() => ObjectIdScalar)
  _id: MongooseTypes.ObjectId;

  @Field(() => String)
  @Prop({ index: true, isRequired: true })
  name: string;

  @Field(() => String)
  @Prop({ isRequired: true })
  color: string;

  @Field(() => String)
  @Prop({ isRequired: true })
  icon: string;
}

export type CategoryDocument = Category & Document;
export const CategorySchema = SchemaFactory.createForClass(Category);
