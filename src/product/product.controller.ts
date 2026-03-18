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

@Controller('Product')
export class ProductController {
  constructor(protected readonly service: ProductService) {}

  @Get()
  getAll(@Query() paginationDto: PaginationDto) {
    return this.service.getAll(paginationDto, 'reviews');
  }

  @Get(':id')
  findOne(@Param('id', ParseObjectIdPipe) id: string) {
    return this.service.findOne(String(id), 'reviews');
  }

  @Get(':id/review')
  getReviews(@Param('id', ParseObjectIdPipe) id: string) {
    return this.service.getProductsReview(String(id));
  }

  @Put(':id/review')
  makeReview(
    @Param('id', ParseObjectIdPipe) id: string,
    @CurrentUser() user,
    @Body() dto: CreateReviewDto,
  ) {
    return this.service.makeReview(user.id, String(id), dto);
  }

  @Post()
  create(@Body() dto: CreateProductDto) {
    return this.service.createProduct(dto);
  }

  @Delete(':id')
  delete(@Param('id', ParseObjectIdPipe) id: string) {
    return this.service.delete(String(id));
  }

  @Patch(':id')
  update(
    @Param('id', ParseObjectIdPipe) id: string,
    @Body() dto: UpdateProductDto,
  ) {
    return this.service.updateProduct(String(id), dto);
  }
}
