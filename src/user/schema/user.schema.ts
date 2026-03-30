import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Role } from 'src/common/role.enum';
import { GenericSchema } from 'src/generic/generic.schema';

@Schema()
export class User extends GenericSchema {
  @Prop()
  firstname: string;

  @Prop()
  lastname: string;

  @Prop({ unique: true })
  email: string;

  @Prop({ select: false })
  password: string;

  @Prop({ type: String, enum: Role, default: Role.USER })
  role: Role;

  @Prop({ select: false, nullable: true })
  otpSecret?: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
