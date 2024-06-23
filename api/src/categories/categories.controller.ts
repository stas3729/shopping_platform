import {Body, Controller, Post} from '@nestjs/common';
import {CategoriesService} from "./categories.service";
import {CreateCategoryDto} from "./dto/createCategory.dto";

@Controller()
export class CategoriesController {
    constructor(private readonly categoriesService: CategoriesService) {}

    @Post('category')
    createCategory(@Body()dto: CreateCategoryDto) {
        return this.categoriesService.createCategory(dto);
    }
}
