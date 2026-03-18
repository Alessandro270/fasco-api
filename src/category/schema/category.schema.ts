import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { GenericSchema } from 'src/generic/generic.schema';

@Schema()
export class Category extends GenericSchema {
  @Prop()
  name: string;

  @Prop()
  description: string;
}

export const CategorySchema = SchemaFactory.createForClass(Category);
