import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Account } from './model/account.model';
import { AccountsService } from './accounts.service';
import { ObjectIdScalar } from 'src/common/scalars/object-id.scalar';

import { Types as MongooseTypes } from 'mongoose';
import { UpdateAccountInput, CreateAccountInput } from './dto/accounts.input.dto';

@Resolver(() => Account)
export class AccountsResolver {
  constructor(private readonly accountService: AccountsService) {}

  @Query(() => [Account])
  async accounts(): Promise<Account[]> {
    return await this.accountService.findAll();
  }

  @Query(() => Account, { nullable: true })
  async account(@Args('id', { type: () => ObjectIdScalar }) _id: MongooseTypes.ObjectId): Promise<Account> {
    return await this.accountService.findById(_id);
  }

  @Mutation(() => Account)
  async createAccount(
    @Args({ name: 'account', type: () => CreateAccountInput })
    accountData: CreateAccountInput,
  ) {
    return await this.accountService.create(accountData);
  }

  @Mutation(() => Account)
  async updateAccount(
    @Args({ name: 'account', type: () => UpdateAccountInput })
    accountData: UpdateAccountInput,
    @Args({ name: 'id', type: () => ObjectIdScalar })
    id: MongooseTypes.ObjectId,
  ) {
    return await this.accountService.update(id, accountData);
  }

  @Mutation(() => Account)
  async removeAccount(
    @Args({ name: 'id', type: () => ObjectIdScalar })
    id: MongooseTypes.ObjectId,
  ) {
    return await this.accountService.delete(id);
  }
}
