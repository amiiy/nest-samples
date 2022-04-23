import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

import { ProductService } from './product.service';

@Controller('product')
export class ProductController {
  constructor(
    private productService: ProductService,
    @Inject('PRODUCT_SERVICE') private readonly client: ClientProxy
  ) {}

  @Get()
  async all() {
    console.log(Object.keys(this.client));

    const res = await this.client.emit('hello', ' from rabbitmq');
    console.log(res);

    return this.productService.all();
  }

  @Get(':id')
  get(@Param('id') id: number) {
    return this.productService.getById(id);
  }

  @Post()
  create(@Body('title') title: string, @Body('image') image: string) {
    return this.productService.create({ title, image });
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body('title') title: string,
    @Body('image') image: string
  ) {
    return this.productService.update(id, { title, image });
  }
}
