import { Controller, Delete, Get, Param, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { ParseObjectIdPipe } from '@nestjs/mongoose';
import { RoleDecorator } from 'src/common/decorators/role.decorator';
import { Role } from 'src/common/role.enum';
import { CurrentUser } from 'src/common/decorators/user.decorator';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @RoleDecorator(Role.ADMIN)
  @Get()
  findAll(@Query() paginationDto: PaginationDto) {
    return this.userService.getAll(paginationDto);
  }

  @Get('me')
  getUser(@CurrentUser() user: any) {
    return this.userService.findOne(String(user.id));
  }

  @RoleDecorator(Role.ADMIN)
  @Get(':id')
  findOne(@Param('id', new ParseObjectIdPipe()) id: string) {
    return this.userService.findOne(String(id));
  }

  @RoleDecorator(Role.ADMIN)
  @Delete(':id')
  delete(@Param('id', new ParseObjectIdPipe()) id: string) {
    return this.userService.delete(String(id));
  }
}
