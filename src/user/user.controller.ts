import { Controller, Delete, Get, Param, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { ParseObjectIdPipe } from '@nestjs/mongoose';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Get()
  findAll(@Query() paginationDto: PaginationDto) {
    return this.userService.getAll(paginationDto);
  }
  @Get(':id')
  findOne(@Param('id', new ParseObjectIdPipe()) id: string) {
    return this.userService.findOne(String(id));
  }
  @Delete(':id')
  delete(@Param('id', new ParseObjectIdPipe()) id: string) {
    return this.userService.delete(String(id));
  }
}
