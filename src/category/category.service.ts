import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { GenericService } from 'src/generic/generic.service';
import { Category } from './schema/category.schema';
import { CategoryRepository } from './category.repository';

@Injectable()
export class CategoryService extends GenericService<Category> {
  constructor(protected readonly repository: CategoryRepository) {
    super(repository);
  }
}
