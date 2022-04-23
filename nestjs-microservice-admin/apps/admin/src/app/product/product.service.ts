import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './product.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>
  ) {}
  async all(): Promise<Product[]> {
    return this.productRepository.find();
  }

  async create(product): Promise<Product> {
    return this.productRepository.save(product);
  }

  async getById(id: number): Promise<Product> {
    return this.productRepository.findOne(id);
  }

  async update(
    id: number,
    data: { title: string; image: string }
  ): Promise<unknown> {
    console.log('data', data);
    console.log('id', id);

    return this.productRepository.update(id, { ...data });
  }
}
