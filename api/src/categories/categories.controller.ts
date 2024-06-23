import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/createCategory.dto';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Post('category')
  createCategory(@Body() dto: CreateCategoryDto) {
    return this.categoriesService.createCategory(dto);
  }

  @Get()
  getCategories() {
    return this.categoriesService.getCategories();
  }

  @Get(':categoryName')
  getProductsByCategoryName(@Param('categoryName') categoryName: string) {
    return this.categoriesService.getProductsByCategoryName(categoryName);
  }
}
