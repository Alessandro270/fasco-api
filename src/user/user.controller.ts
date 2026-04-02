import { Controller, Delete, Get, Param, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { ParseObjectIdPipe } from '@nestjs/mongoose';
import { RoleDecorator } from 'src/common/decorators/role.decorator';
import { Role } from 'src/common/role.enum';
import { CurrentUser } from 'src/common/decorators/user.decorator';
import { ApiOperation } from '@nestjs/swagger';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({ summary: 'Listar todos os usuários' })
  @RoleDecorator(Role.ADMIN)
  @Get()
  findAll(@Query() paginationDto: PaginationDto) {
    return this.userService.getAll(paginationDto);
  }

  @ApiOperation({ summary: 'Listar o usuário logado' })
  @Get('me')
  getUser(@CurrentUser() user: any) {
    return this.userService.findOne(String(user.id));
  }

  @ApiOperation({ summary: 'Listar um usuário por ID' })
  @RoleDecorator(Role.ADMIN)
  @Get(':id')
  findOne(@Param('id', new ParseObjectIdPipe()) id: string) {
    return this.userService.findOne(String(id));
  }

  @ApiOperation({ summary: 'Deletar um usuário por ID' })
  @RoleDecorator(Role.ADMIN)
  @Delete(':id')
  delete(@Param('id', new ParseObjectIdPipe()) id: string) {
    return this.userService.delete(String(id));
  }
}
