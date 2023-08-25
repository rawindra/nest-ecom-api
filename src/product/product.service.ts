import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product, ProductDocument } from './entities/product.entity';
import * as fs from 'fs';
import { ProductAttributeValuePriceDocument } from './entities/productAttributeValuePrice';
import { ProductAttributeValuePriceDto } from './dto/product-attribute-value-price.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel('Product')
    private readonly productModel: Model<ProductDocument>,
    @InjectModel('ProductAttributeValuePrice')
    private readonly productAttributeValuePriceModel: Model<ProductAttributeValuePriceDocument>,
  ) {}

  async create(
    image: Express.Multer.File,
    createProductDto: CreateProductDto,
    productAttributePriceValueDto: ProductAttributeValuePriceDto,
  ) {
    const product = new this.productModel({
      ...createProductDto,
      image: image ? image.path : null,
    });

    const newProduct = await product.save();

    productAttributePriceValueDto.product = newProduct._id.toString();

    const productAttributeValuePrice = new this.productAttributeValuePriceModel(
      productAttributePriceValueDto,
    );

    productAttributeValuePrice.save();

    return await product.populate('category attribute');
  }

  async findAll() {
    const product = await this.productModel.find().populate('category pavp');

    return product;
  }

  findOne(id: number) {
    return `This action returns a #${id} product`;
  }

  async update(
    id: string,
    image: Express.Multer.File,
    updateProductDto: UpdateProductDto,
  ) {
    const productExisintingWithSameName = await this.productModel.findOne({
      _id: { $ne: id },
      name: updateProductDto.name,
    });

    if (productExisintingWithSameName) {
      throw new ConflictException(`Product already exits`);
    }

    const product = await this.productModel.findByIdAndUpdate(
      id,
      {
        ...updateProductDto,
        image: image && image.path,
      },
      { new: true },
    );
    if (!product) {
      throw new NotFoundException(`Product #${id} not found`);
    }
    if (product.image) {
      fs.unlink(product.image, (err) => {
        if (err) {
          throw err;
        }
      });
    }
    return product;
  }

  async remove(id: string): Promise<Product> {
    const product = await this.productModel.findById(id);
    if (!product) {
      throw new NotFoundException(`Product #${id} not found`);
    }

    if (product.image) {
      fs.unlink(product.image, (err) => {
        if (err) {
          throw err;
        }
      });
    }

    product.deleteOne();

    return product;
  }
}
