import { Document, Model } from 'mongoose';

export class GenericRepository<T extends Document> {
  constructor(protected readonly model: Model<T>) {}

  async create(data: Partial<T>) {
    return await this.model.create(data);
  }

  async findAll(
    options?: { page?: number; limit?: number },
    filter?: Record<string, any>,
    relations?: string | string[],
  ) {
    let { page = 1, limit = 10 } = options || {};
    page = Number(page);
    limit = Number(limit);
    const skip = (page - 1) * limit;
    const [data, total] = await Promise.all([
      this.model
        .find({ ...filter, softDeletedAt: null })
        .limit(limit)
        .skip(skip)
        .populate(relations ?? []),
      this.model.countDocuments({ ...filter, softDeletedAt: null }),
    ]);
    return { data, total, totalPages: Math.ceil(total / limit) };
  }

  async findById(id: string, relations?: string | string[]): Promise<T | null> {
    return await this.model
      .findOne({ _id: id, softDeletedAt: null })
      .populate(relations ?? []);
  }

  async findOneAnyWhere(
    filter: Record<string, any> = { softDeletedAt: null },
    relations?: string | string[],
  ): Promise<T | null> {
    if (!filter || Object.keys(filter).length === 0) return null;
    return await this.model
      .findOne({ ...filter, softDeletedAt: null })
      .populate(relations ?? []);
  }

  async update(id: string, data: Partial<T>) {
    const entity = await this.findById(id);
    if (!entity) return null;
    return await this.model.updateOne({ _id: id }, { ...data });
  }

  async delete(id: string) {
    const entity = await this.findById(id);
    if (!entity) return null;
    return await this.model.findByIdAndUpdate(
      id,
      { softDeletedAt: new Date() },
      { new: true },
    );
  }
}
