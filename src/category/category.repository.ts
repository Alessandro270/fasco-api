import { GenericRepository } from 'src/generic/generic.repository';
import { Category } from './schema/category.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

export class CategoryRepository extends GenericRepository<Category> {
  constructor(
    @InjectModel(Category.name)
    protected readonly model: Model<Category>,
  ) {
    super(model);
  }
}
