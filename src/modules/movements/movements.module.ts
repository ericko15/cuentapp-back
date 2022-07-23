import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Movement, MovementSchema } from './model/movement.model';
import { ObjectIdScalar } from 'src/common/scalars/object-id.scalar';
import { MovementsService } from './movements.service';
import { MovementsResolver } from './movements.resolver';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Movement.name,
        schema: MovementSchema,
      },
    ]),
  ],
  providers: [ObjectIdScalar, MovementsService, MovementsResolver],
})
export class MovementsModule {}
