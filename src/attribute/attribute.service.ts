import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateAttributeDto } from './dto/create-attribute.dto';
import { UpdateAttributeDto } from './dto/update-attribute.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Attribute, AttributeDocument } from './entities/attribute.entity';

@Injectable()
export class AttributeService {
  constructor(
    @InjectModel('Attribute')
    private readonly attributeModel: Model<AttributeDocument>,
  ) {}

  async create(createAttributeDto: CreateAttributeDto) {
    const attribute = new this.attributeModel(createAttributeDto);
    return attribute.save();
  }

  async findAll(): Promise<Attribute[]> {
    const attribute = await this.attributeModel.find();

    return attribute;
  }

  async findOne(id: string): Promise<Attribute> {
    const attribute = await this.attributeModel.findById(id).exec();
    if (!attribute) {
      throw new NotFoundException(`Attribute #${id} not found`);
    }
    return attribute;
  }

  async update(
    id: string,
    updateAttributeDto: UpdateAttributeDto,
  ): Promise<Attribute> {
    const attributeExisintingWithSameName = await this.attributeModel.findOne({
      _id: { $ne: id },
      name: updateAttributeDto.name,
    });

    if (attributeExisintingWithSameName) {
      throw new ConflictException(`Attribute already exits`);
    }
    const attribute = await this.attributeModel.findByIdAndUpdate(
      id,
      updateAttributeDto,
      { new: true },
    );
    if (!attribute) {
      throw new NotFoundException(`Attribute #${id} not found`);
    }
    return attribute;
  }

  async remove(id: string): Promise<Attribute> {
    const attribute = await this.attributeModel.findByIdAndDelete(id);
    if (!attribute) {
      throw new NotFoundException(`Attribute #${id} not found`);
    }
    return attribute;
  }
}
