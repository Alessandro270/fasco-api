import { GenericRepository } from 'src/generic/generic.repository';
import { User } from './schema/user.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

export class UserRepository extends GenericRepository<User> {
  constructor(
    @InjectModel(User.name)
    protected readonly model: Model<User>,
  ) {
    super(model);
  }
  async findWithPassword(filter: Record<string, any>) {
    return await this.model.findOne(filter).select('+password');
  }
  async findWithOtpSecret(filter: Record<string, any>) {
    return await this.model.findOne(filter).select('+otpSecret');
  }
}
