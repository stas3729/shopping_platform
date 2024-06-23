import { HttpException, Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/createProduct.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';
import { CategoriesService } from '../categories/categories.service';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productsRepository: Repository<Product>,
    private categoriesService: CategoriesService,
  ) {}

  async createProduct(
    categoryName: string,
    createProductDto: CreateProductDto,
  ) {
    const category = await this.categoriesService.findByName(categoryName);
    if (!category) {
      throw new HttpException('Category not found.', 409);
    }
    const product = this.productsRepository.create({
      ...createProductDto,
      category,
    });
    return this.productsRepository.save(product);
  }

  async getProductsWithCategoryId(categoryId: number): Promise<Product[]> {
    return await this.productsRepository.find({
      where: { category: { id: categoryId } },
    });
  }
}
