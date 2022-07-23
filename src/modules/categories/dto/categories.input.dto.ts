import { InputType, Field } from '@nestjs/graphql';
import { IsString, IsNotEmpty, MinLength, MaxLength, IsOptional } from 'class-validator';

@InputType()
export class CreateCategoryInput {
  @IsNotEmpty()
  @IsString()
  @MinLength(2)
  @MaxLength(100)
  @Field(() => String)
  name: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(2)
  @MaxLength(100)
  @Field(() => String)
  color: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(2)
  @MaxLength(100)
  @Field(() => String)
  icon: string;
}

@InputType()
export class UpdateCategoryInput {
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @MinLength(2)
  @MaxLength(100)
  @Field(() => String, { nullable: true })
  name?: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @MinLength(2)
  @MaxLength(100)
  @Field(() => String)
  color?: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @MinLength(2)
  @MaxLength(100)
  @Field(() => String)
  icon?: string;
}
