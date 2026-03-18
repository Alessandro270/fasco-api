import { Prop } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export class GenericSchema extends Document {
  @Prop({ type: Date, default: Date.now })
  createdAt?: Date;

  @Prop({ type: Date, default: Date.now })
  updatedAt?: Date;

  @Prop({ type: Date, default: null, nullable: true })
  softDeletedAt?: Date;
}
