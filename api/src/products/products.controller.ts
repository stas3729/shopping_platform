import {Body, Controller, Param, Post, ParseIntPipe} from '@nestjs/common';
import { ProductsService } from './products.service';
import {CreateProductDto} from "./dto/createProduct.dto";

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post(':categoryName')
  createProduct(@Param('categoryName') categoryName: string,
                @Body() createProductDto: CreateProductDto
  ) {
    return this.productsService.createProduct(categoryName, createProductDto);
  }
}
