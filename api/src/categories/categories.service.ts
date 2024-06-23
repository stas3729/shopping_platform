import {ConflictException, Injectable} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {Category} from "./entities/category.entity";
import {Repository} from "typeorm";
import {CreateCategoryDto} from "./dto/createCategory.dto";

@Injectable()
export class CategoriesService {
    constructor(@InjectRepository(Category) private readonly categoryRepository: Repository<Category>) {}

    async createCategory(createCategoryDto: CreateCategoryDto): Promise<Category> {
        const isExists = await this.findByName(createCategoryDto.name);
        if(isExists) {
            throw new ConflictException('This category already exists.')
        }
        const category = this.categoryRepository.create(createCategoryDto);
        return await this.categoryRepository.save(category);
    }

    findByName(name: string) {
        return this.categoryRepository.findOne({
            where: {
                name
            }
        })
    }
}
