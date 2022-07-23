import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Field, ObjectType, registerEnumType } from '@nestjs/graphql';
import { Document, Types as MongooseTypes } from 'mongoose';

import { ObjectIdScalar } from 'src/common/scalars/object-id.scalar';
import { Category } from 'src/modules/categories/model/category.model';
import { Account } from 'src/modules/accounts/model/account.model';
import { MovementTypeEnum } from 'src/common/enums/movement-type.enum';

registerEnumType(MovementTypeEnum, {
  name: 'MovementTypeEnum',
  description: 'Movement types',
});

@ObjectType()
@Schema({ timestamps: true })
export class Movement {
  @Field(() => ObjectIdScalar)
  _id: MongooseTypes.ObjectId;

  @Field(() => Number)
  @Prop({ isRequired: true, min: 0 })
  amount: number;

  @Field(() => String)
  @Prop({ isRequired: true })
  description: string;

  @Field(() => MovementTypeEnum)
  @Prop({ index: true, isRequired: true })
  movementType: MovementTypeEnum;

  @Field(() => Category)
  @Prop({ type: MongooseTypes.ObjectId, ref: 'Category', isRequired: true })
  category: Category;

  @Field(() => Account)
  @Prop({ type: MongooseTypes.ObjectId, ref: 'Account', isRequired: true })
  account: Account;
}

export type MovementDocument = Movement & Document;
export const MovementSchema = SchemaFactory.createForClass(Movement);
