import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './common/database/database.module';
import { GraphqlModule } from './common/graphql/graphql.module';
import { CategoriesModule } from './modules/categories/categories.module';

@Module({
  imports: [DatabaseModule, GraphqlModule, CategoriesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
