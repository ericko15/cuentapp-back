import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './common/database/database.module';
import { GraphqlModule } from './common/graphql/graphql.module';
import { CategoriesModule } from './modules/categories/categories.module';
import { AccountsModule } from './modules/accounts/accounts.module';
import { MovementsModule } from './modules/movements/movements.module';

@Module({
  imports: [DatabaseModule, GraphqlModule, CategoriesModule, AccountsModule, MovementsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
