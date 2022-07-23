import { Field, InputType, registerEnumType } from '@nestjs/graphql';
import { IsEnum, IsNotEmpty, IsNumber, IsString, MaxLength, Min, MinLength } from 'class-validator';

import { MovementTypeEnum } from 'src/common/enums/movement-type.enum';
import { ObjectIdScalar } from 'src/common/scalars/object-id.scalar';

registerEnumType(MovementTypeEnum, {
  name: 'MovementTypeEnum',
  description: 'Movement types',
});

@InputType()
export class CreateMovementInput {
  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  @Field(() => Number)
  amount: number;

  @IsNotEmpty()
  @IsString()
  @MinLength(2)
  @MaxLength(100)
  @Field(() => String)
  description: string;

  @IsNotEmpty()
  @IsEnum(MovementTypeEnum)
  @Field(() => MovementTypeEnum)
  movementType: MovementTypeEnum;

  @IsNotEmpty()
  @Field(() => ObjectIdScalar)
  category: ObjectIdScalar;

  @IsNotEmpty()
  @Field(() => ObjectIdScalar)
  account: ObjectIdScalar;
}

@InputType()
export class UpdateMovementInput {
  @IsNumber()
  @Min(0)
  @Field(() => Number, { nullable: true })
  amount?: number;

  @IsString()
  @MinLength(2)
  @MaxLength(100)
  @Field(() => String, { nullable: true })
  description?: string;

  @IsEnum(MovementTypeEnum)
  @Field(() => MovementTypeEnum, { nullable: true })
  movementType?: MovementTypeEnum;

  @Field(() => ObjectIdScalar, { nullable: true })
  category?: ObjectIdScalar;

  @Field(() => ObjectIdScalar, { nullable: true })
  account?: ObjectIdScalar;
}
