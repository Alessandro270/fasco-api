import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { CreateProductDto } from './dto/create-product.dto';
import { ParseObjectIdPipe } from '@nestjs/mongoose';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductService } from './product.service';
import { CreateReviewDto } from 'src/review/dto/create-review.dto';
import { CurrentUser } from 'src/common/decorators/user.decorator';
import { Role } from 'src/common/role.enum';
import { RoleDecorator } from 'src/common/decorators/role.decorator';
import { ApiOperation } from '@nestjs/swagger';

@Controller('Product')
export class ProductController {
  constructor(protected readonly service: ProductService) {}

  @ApiOperation({ summary: 'Listar produtos' })
  @Get()
  getAll(@Query() paginationDto: PaginationDto) {
    return this.service.getAll(paginationDto, 'reviews');
  }

  @ApiOperation({ summary: 'Obter detalhes de um produto' })
  @Get(':id')
  findOne(@Param('id', ParseObjectIdPipe) id: string) {
    return this.service.findOne(String(id), 'reviews');
  }

  @ApiOperation({ summary: 'Obter avaliações de um produto' })
  @Get(':id/review')
  getReviews(@Param('id', ParseObjectIdPipe) id: string) {
    return this.service.getProductsReview(String(id));
  }

  @ApiOperation({ summary: 'Fazer uma avaliação de um produto' })
  @Put(':id/review')
  makeReview(
    @Param('id', ParseObjectIdPipe) id: string,
    @CurrentUser() user: any,
    @Body() dto: CreateReviewDto,
  ) {
    return this.service.makeReview(user.id, String(id), dto);
  }

  @ApiOperation({ summary: 'Criar um novo produto' })
  @RoleDecorator(Role.ADMIN)
  @Post()
  create(@Body() dto: CreateProductDto) {
    return this.service.createProduct(dto);
  }

  @ApiOperation({ summary: 'Deletar um produto' })
  @RoleDecorator(Role.ADMIN)
  @Delete(':id')
  delete(@Param('id', ParseObjectIdPipe) id: string) {
    return this.service.delete(String(id));
  }

  @ApiOperation({ summary: 'Atualizar um produto' })
  @RoleDecorator(Role.ADMIN)
  @Patch(':id')
  update(
    @Param('id', ParseObjectIdPipe) id: string,
    @Body() dto: UpdateProductDto,
  ) {
    return this.service.updateProduct(String(id), dto);
  }
}
