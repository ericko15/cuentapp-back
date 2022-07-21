import { Global, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

@Global()
@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://cuentapp:cuentapp123@cuentaap.j3is3df.mongodb.net/?retryWrites=true&w=majority',
    ),
  ],
  exports: [MongooseModule],
})
export class DatabaseModule {}
