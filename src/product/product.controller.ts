import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  Res,
  ConflictException,
  HttpStatus,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { multerOptions } from 'src/config/multer.config';
import { Response } from 'express';
import { ProductAttributeValuePriceDto } from './dto/product-attribute-value-price.dto';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  @UseInterceptors(FileInterceptor('image', multerOptions))
  async create(
    @Res() response: Response,
    @UploadedFile() image: Express.Multer.File,
    @Body() createProductDto: CreateProductDto,
    @Body() productAttributeValuePriceDto: ProductAttributeValuePriceDto,
  ) {
    try {
      const product = await this.productService.create(
        image,
        createProductDto,
        productAttributeValuePriceDto,
      );
      return response.status(HttpStatus.CREATED).json({
        message: 'Product has been created successfully',
        product,
      });
    } catch (error) {
      if (error.code === 11000) {
        throw new ConflictException('Product already exists');
      }
      return response.status(HttpStatus.BAD_REQUEST).json({
        statusCode: 400,
        message: 'Error: Product not created!',
        error: 'Bad Request',
      });
    }
  }

  @Get()
  async findAll() {
    return await this.productService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productService.findOne(+id);
  }

  @Patch(':id')
  @UseInterceptors(FileInterceptor('image', multerOptions))
  async update(
    @Res() response: Response,
    @Param('id') id: string,
    @UploadedFile() image: Express.Multer.File,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    try {
      const product = await this.productService.update(
        id,
        image,
        updateProductDto,
      );
      return response.status(HttpStatus.CREATED).json({
        message: 'Product has been updated successfully',
        product,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }

  @Delete(':id')
  async remove(@Res() response: Response, @Param('id') id: string) {
    try {
      const category = await this.productService.remove(id);
      return response.status(HttpStatus.OK).json({
        message: 'Product has been successfully deleted',
        category,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }
}
