import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { GenericService } from 'src/generic/generic.service';
import { Product } from './schema/product.schema';
import { ProductRepository } from './product.repository';
import { CreateProductDto } from './dto/create-product.dto';
import { CategoryService } from 'src/category/category.service';
import { UpdateProductDto } from './dto/update-product.dto';
import { ReviewService } from 'src/review/review.service';
import { CreateReviewDto } from 'src/review/dto/create-review.dto';

@Injectable()
export class ProductService extends GenericService<Product> {
  constructor(
    protected readonly repository: ProductRepository,
    private readonly categoryService: CategoryService,
    @Inject(forwardRef(() => ReviewService))
    private readonly reviewService: ReviewService,
  ) {
    super(repository);
  }

  async createProduct(dto: CreateProductDto): Promise<Product | null> {
    const category = await this.categoryService.findBy({ name: dto.category });
    if (!category) throw new BadRequestException('Categoria inexistente');
    const product = await this.repository.create({
      ...dto,
      category,
    });
    return product;
  }

  async updateProduct(id: string, dto: UpdateProductDto) {
    if (dto.category) {
      const category = await this.categoryService.findBy({
        name: dto.category,
      });
      if (!category) throw new BadRequestException('Categoria inexistente');
      const product = await this.repository.update(id, { ...dto, category });
      return product;
    }
    const { category, ...data } = dto;
    const product = await this.repository.update(id, data);
    return product;
  }

  getProductsReview(id: string) {
    return this.reviewService.getProductsReview(id);
  }

  async makeReview(userId: string, productId: string, dto: CreateReviewDto) {
    const result = await this.reviewService.makeReview(userId, productId, dto);
    if (!result)
      throw new InternalServerErrorException(
        'Ocorreu um erro ao fazer a review',
      );
    return { message: 'Review feita com sucesso' };
  }
}
