import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpStatus,
  Res,
  ConflictException,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Response, response } from 'express';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  async create(
    @Res() response: Response,
    @Body() createCategoryDto: CreateCategoryDto,
  ) {
    try {
      const category = await this.categoryService.create(createCategoryDto);

      return response.status(HttpStatus.CREATED).json({
        message: 'Category has been created successfully',
        category,
      });
    } catch (err) {
      if (err.code === 11000) {
        throw new ConflictException('Category already exists');
      }
      return response.status(HttpStatus.BAD_REQUEST).json({
        statusCode: 400,
        message: 'Error: Category not created!',
        error: 'Bad Request',
      });
    }
  }

  @Get()
  findAll() {
    return this.categoryService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.categoryService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Res() response: Response,
    @Param('id') id: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    try {
      const category = await this.categoryService.update(id, updateCategoryDto);
      return response.status(HttpStatus.OK).json({
        message: 'Category has been successfully updated',
        category,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }

  @Delete(':id')
  async remove(@Res() response: Response, @Param('id') id: string) {
    try {
      const category = await this.categoryService.remove(id);
      return response.status(HttpStatus.OK).json({
        message: 'Category has been successfully deleted',
        category,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }
}
