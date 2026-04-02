import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { ParseObjectIdPipe } from '@nestjs/mongoose';
import { RoleDecorator } from 'src/common/decorators/role.decorator';
import { Role } from 'src/common/role.enum';
import { ApiOperation } from '@nestjs/swagger';

@Controller('category')
export class CategoryController {
  constructor(private readonly service: CategoryService) {}

  @ApiOperation({ summary: 'Criar nova categoria' })
  @RoleDecorator(Role.ADMIN)
  @Post()
  create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.service.create(createCategoryDto);
  }

  @ApiOperation({ summary: 'Listar categorias com paginação' })
  @Get()
  findAll(@Query() paginationDto: PaginationDto) {
    return this.service.getAll(paginationDto);
  }

  @ApiOperation({ summary: 'Obter detalhes de uma categoria por ID' })
  @Get(':id')
  findOne(@Param('id', ParseObjectIdPipe) id: string) {
    return this.service.findOne(String(id));
  }

  @ApiOperation({ summary: 'Atualizar categoria por ID' })
  @RoleDecorator(Role.ADMIN)
  @Patch(':id')
  update(
    @Param('id', ParseObjectIdPipe) id: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    return this.service.update(String(id), updateCategoryDto);
  }

  @ApiOperation({ summary: 'Deletar categoria por ID' })
  @RoleDecorator(Role.ADMIN)
  @Delete(':id')
  remove(@Param('id', ParseObjectIdPipe) id: string) {
    return this.service.delete(String(id));
  }
}
