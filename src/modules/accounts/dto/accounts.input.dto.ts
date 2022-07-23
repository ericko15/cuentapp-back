import { InputType, Field } from '@nestjs/graphql';
import { IsString, IsNotEmpty, MinLength, MaxLength, IsOptional, Min, IsNumber, IsBoolean } from 'class-validator';

@InputType()
export class CreateAccountInput {
  @IsNotEmpty()
  @IsString()
  @MinLength(2)
  @MaxLength(100)
  @Field(() => String)
  name: string;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  @Field(() => Number)
  amount: string;

  @IsOptional()
  @IsNotEmpty()
  @IsBoolean()
  @Field(() => Boolean, { nullable: true })
  isVisible: boolean;

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
export class UpdateAccountInput {
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @MinLength(2)
  @MaxLength(100)
  @Field(() => String, { nullable: true })
  name?: string;

  @IsOptional()
  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  @Field(() => Number, { nullable: true })
  amount?: string;

  @IsOptional()
  @IsNotEmpty()
  @IsBoolean()
  @Field(() => Boolean, { nullable: true })
  isVisible?: boolean;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @MinLength(2)
  @MaxLength(100)
  @Field(() => String, { nullable: true })
  color?: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @MinLength(2)
  @MaxLength(100)
  @Field(() => String, { nullable: true })
  icon?: string;
}
