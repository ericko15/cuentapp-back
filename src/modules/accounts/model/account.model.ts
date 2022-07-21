import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Field, ObjectType } from '@nestjs/graphql';
import { Document, Types as MongooseTypes } from 'mongoose';

import { ObjectIdScalar } from 'src/common/scalars/object-id.scalar';

@ObjectType()
@Schema({ timestamps: true })
export class Account {
  @Field(() => ObjectIdScalar)
  _id: MongooseTypes.ObjectId;

  @Field(() => String)
  @Prop({ index: true, isRequired: true })
  name: string;

  @Field(() => Number)
  @Prop({ isRequired: true })
  amount: number;

  @Field(() => Boolean)
  @Prop({ default: true })
  isVisible: boolean;

  @Field(() => String)
  @Prop({ isRequired: true })
  icon: string;

  @Field(() => String)
  @Prop({ isRequired: true })
  color: string;
}

export type AccountDocument = Account & Document;
export const AccountSchema = SchemaFactory.createForClass(Account);
