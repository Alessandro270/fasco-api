import { GenericRepository } from 'src/generic/generic.repository';
import { Review } from './schema/review.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

export class ReviewRepository extends GenericRepository<Review> {
  constructor(
    @InjectModel(Review.name)
    protected readonly model: Model<Review>,
  ) {
    super(model);
  }
}
