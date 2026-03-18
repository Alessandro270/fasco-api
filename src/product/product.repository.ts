import { GenericRepository } from 'src/generic/generic.repository';
import { Product } from './schema/product.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Category } from 'src/category/schema/category.schema';
import { NotFoundException } from '@nestjs/common';

export class ProductRepository extends GenericRepository<Product> {
  constructor(
    @InjectModel(Product.name)
    protected readonly model: Model<Product>,
  ) {
    super(model);
  }
}
