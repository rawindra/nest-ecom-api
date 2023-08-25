import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Category, CategoryDocument } from './entities/category.entity';
import { Model } from 'mongoose';

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel('Category')
    private readonly categoryModel: Model<CategoryDocument>,
  ) {}

  async create(createCategoryDto: CreateCategoryDto) {
    const category = new this.categoryModel(createCategoryDto);
    return category.save();
  }

  async findAll(): Promise<Category[]> {
    const category = await this.categoryModel.find();

    return category;
  }

  async findOne(id: string): Promise<Category> {
    const category = await this.categoryModel.findById(id).exec();
    if (!category) {
      throw new NotFoundException(`Category #${id} not found`);
    }
    return category;
  }

  async update(
    id: string,
    updateCategoryDto: UpdateCategoryDto,
  ): Promise<Category> {
    const categoryExisintingWithSameName = await this.categoryModel.findOne({
      _id: { $ne: id },
      name: UpdateCategoryDto.name,
    });

    if (categoryExisintingWithSameName) {
      throw new ConflictException(`Category already exits`);
    }

    const category = await this.categoryModel.findByIdAndUpdate(
      id,
      updateCategoryDto,
      { new: true },
    );
    if (!category) {
      throw new NotFoundException(`Category #${id} not found`);
    }
    return category;
  }

  async remove(id: string): Promise<Category> {
    const category = await this.categoryModel.findByIdAndDelete(id);
    if (!category) {
      throw new NotFoundException(`Category #${id} not found`);
    }
    return category;
  }
}
