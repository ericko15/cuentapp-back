import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AccountSchema, Account } from './model/account.model';
import { ObjectIdScalar } from 'src/common/scalars/object-id.scalar';
import { AccountsService } from './accounts.service';
import { AccountsResolver } from './accounts.resolver';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Account.name,
        schema: AccountSchema,
      },
    ]),
  ],
  providers: [ObjectIdScalar, AccountsService, AccountsResolver],
})
export class AccountsModule {}
