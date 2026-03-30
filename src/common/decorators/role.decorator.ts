import { SetMetadata } from '@nestjs/common';
import { Role } from '../role.enum';

export const RoleDecorator = (role: Role) => SetMetadata('roles', role);
