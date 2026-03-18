import { Injectable } from '@nestjs/common';
import { GenericService } from 'src/generic/generic.service';
import { User } from './schema/user.schema';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService extends GenericService<User> {
  constructor(protected repository: UserRepository) {
    super(repository);
  }

  findWithPassword(filter: Record<string, any>) {
    return this.repository.findWithPassword(filter);
  }

  findWithOtpSecret(filter: Record<string, any>) {
    return this.repository.findWithOtpSecret(filter);
  }
}
