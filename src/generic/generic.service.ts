import { PaginationDto } from 'src/common/dto/pagination.dto';
import { GenericRepository } from './generic.repository';
import { Document } from 'mongoose';

export class GenericService<T extends Document> {
  constructor(protected readonly repository: GenericRepository<T>) {}

  async create(data: Partial<T>) {
    return await this.repository.create(data);
  }

  async getAll(paginationDto: PaginationDto, relations?: string | string[]) {
    return this.repository.findAll(paginationDto, undefined, relations ?? []);
  }

  async findBy(filter: Record<string, any>, relations?: string | string[]) {
    return await this.repository.findOneAnyWhere(filter, relations);
  }

  async findOne(id: string, relations?: string[] | string): Promise<T | null> {
    return await this.repository.findById(id, relations);
  }

  async update(id: string, data: Partial<T>) {
    return await this.repository.update(id, data);
  }

  async delete(id: string) {
    return await this.repository.delete(id);
  }
}
