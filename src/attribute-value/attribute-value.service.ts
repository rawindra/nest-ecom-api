import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateAttributeValueDto } from './dto/create-attribute-value.dto';
import { UpdateAttributeValueDto } from './dto/update-attribute-value.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  AttributeValue,
  AttributeValueDocument,
} from './entities/attribute-value.entity';

@Injectable()
export class AttributeValueService {
  constructor(
    @InjectModel('AttributeValue')
    private readonly attributeValueModel: Model<AttributeValueDocument>,
  ) {}

  async create(createAttributeValueDto: CreateAttributeValueDto) {
    const attributeValue = new this.attributeValueModel(
      createAttributeValueDto,
    );
    return attributeValue.save();
  }

  async findAll(): Promise<AttributeValue[]> {
    const attributeValue = await this.attributeValueModel.find();

    return attributeValue;
  }

  async findOne(id: string): Promise<AttributeValue> {
    const attributeValue = await this.attributeValueModel.findById(id).exec();
    if (!attributeValue) {
      throw new NotFoundException(`Attribute Value #${id} not found`);
    }
    return attributeValue;
  }

  async update(
    id: string,
    updateAttributeValueDto: UpdateAttributeValueDto,
  ): Promise<AttributeValue> {
    const attributeValueExisintingWithSameName =
      await this.attributeValueModel.findOne({
        _id: { $ne: id },
        name: updateAttributeValueDto.name,
      });

    if (attributeValueExisintingWithSameName) {
      throw new ConflictException(`Attribute Value already exits`);
    }

    const attributeValue = await this.attributeValueModel.findByIdAndUpdate(
      id,
      updateAttributeValueDto,
      { new: true },
    );
    if (!attributeValue) {
      throw new NotFoundException(`AttributeValue #${id} not found`);
    }
    return attributeValue;
  }

  async remove(id: string): Promise<AttributeValue> {
    const attributeValue = await this.attributeValueModel.findByIdAndDelete(id);
    if (!attributeValue) {
      throw new NotFoundException(`Attribute Value #${id} not found`);
    }
    return attributeValue;
  }
}
