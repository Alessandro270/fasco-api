import {
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { GenericService } from 'src/generic/generic.service';
import { Review } from './schema/review.schema';
import { ReviewRepository } from './review.repository';
import { CreateReviewDto } from './dto/create-review.dto';
import { ProductService } from 'src/product/product.service';
import { UserService } from 'src/user/user.service';
import { Types } from 'mongoose';

@Injectable()
export class ReviewService extends GenericService<Review> {
  constructor(
    protected readonly repository: ReviewRepository,
    @Inject(forwardRef(() => ProductService))
    private readonly productService: ProductService,
    private readonly userService: UserService,
  ) {
    super(repository);
  }

  async getProductsReview(productId: string) {
    const reviews = this.repository.findAll(undefined, {
      product: new Types.ObjectId(productId),
    });
    return reviews;
  }

  async makeReview(userId: string, productId: string, dto: CreateReviewDto) {
    const product = await this.productService.findOne(productId);
    if (!product) throw new NotFoundException('Produto inexistente');
    const user = await this.userService.findOne(userId);
    if (!user) throw new NotFoundException('Usuário inexistente');
    const review = await this.findBy({
      product: product._id,
      user: user._id,
    });

    if (review)
      return await this.repository.update(String(review._id), {
        value: dto.value,
      });

    return await this.repository.create({
      user: user,
      product: product,
      value: dto.value,
    });
  }
}
