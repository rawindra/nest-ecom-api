import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ProductDocument } from './entities/product.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel('Product')
    private readonly categoryModel: Model<ProductDocument>,
  ) {}

  create(image, createProductDto: CreateProductDto) {
    const product = new this.categoryModel({
      ...createProductDto,
      image: image.path,
    });

    return product.save();
  }

  findAll() {
    return `This action returns all product`;
  }

  findOne(id: number) {
    return `This action returns a #${id} product`;
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
