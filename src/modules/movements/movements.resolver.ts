import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Movement } from './model/movement.model';
import { MovementsService } from './movements.service';
import { ObjectIdScalar } from 'src/common/scalars/object-id.scalar';

import { Types as MongooseTypes } from 'mongoose';
import { CreateMovementInput, UpdateMovementInput } from './dto/movements.input.dto';

@Resolver(() => Movement)
export class MovementsResolver {
  constructor(private readonly movementService: MovementsService) {}

  @Query(() => [Movement])
  async movements(): Promise<Movement[]> {
    return await this.movementService.findAll();
  }

  @Query(() => Movement, { nullable: true })
  async movement(@Args('id', { type: () => ObjectIdScalar }) _id: MongooseTypes.ObjectId): Promise<Movement> {
    return await this.movementService.findById(_id);
  }

  @Mutation(() => Movement)
  async createMovement(
    @Args({ name: 'movement', type: () => CreateMovementInput })
    accountData: CreateMovementInput,
  ) {
    return await this.movementService.create(accountData);
  }

  @Mutation(() => Movement)
  async updateMovement(
    @Args({ name: 'movement', type: () => UpdateMovementInput })
    accountData: UpdateMovementInput,
    @Args({ name: 'id', type: () => ObjectIdScalar })
    id: MongooseTypes.ObjectId,
  ) {
    return await this.movementService.update(id, accountData);
  }

  @Mutation(() => Movement)
  async removeMovement(
    @Args({ name: 'id', type: () => ObjectIdScalar })
    id: MongooseTypes.ObjectId,
  ) {
    return await this.movementService.delete(id);
  }
}
