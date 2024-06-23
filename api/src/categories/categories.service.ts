import {
  ConflictException,
  forwardRef,
  HttpException,
  Inject,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { Repository } from 'typeorm';
import { CreateCategoryDto } from './dto/createCategory.dto';
import { ProductsService } from '../products/products.service';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private readonly categoriesRepository: Repository<Category>,
    @Inject(forwardRef(() => ProductsService))
    readonly productsService: ProductsService,
  ) {}

  async createCategory(
    createCategoryDto: CreateCategoryDto,
  ): Promise<Category> {
    const isExists = await this.findByName(createCategoryDto.name);
    if (isExists) {
      throw new ConflictException('This category already exists.');
    }
    const category = this.categoriesRepository.create(createCategoryDto);
    return await this.categoriesRepository.save(category);
  }

  findByName(name: string) {
    return this.categoriesRepository.findOne({
      where: {
        name,
      },
    });
  }

  async getProductsByCategoryName(categoryName: string) {
    const category = await this.findByName(categoryName);
    if (!category) {
      throw new HttpException('This category does not exists.', 409);
    }
    return this.productsService.getProductsWithCategoryId(category.id);
  }

  getCategories() {
    return this.categoriesRepository.find();
  }
}
