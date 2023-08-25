import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
  HttpStatus,
  ConflictException,
} from '@nestjs/common';
import { AttributeValueService } from './attribute-value.service';
import { CreateAttributeValueDto } from './dto/create-attribute-value.dto';
import { UpdateAttributeValueDto } from './dto/update-attribute-value.dto';
import { Response } from 'express';

@Controller('attribute-value')
export class AttributeValueController {
  constructor(private readonly attributeValueService: AttributeValueService) {}

  @Post()
  async create(
    @Res() response: Response,
    @Body() createAttributeValueDto: CreateAttributeValueDto,
  ) {
    try {
      const attributeValue = await this.attributeValueService.create(
        createAttributeValueDto,
      );

      return response.status(HttpStatus.CREATED).json({
        message: 'Attribute Value has been created successfully',
        attributeValue,
      });
    } catch (err) {
      if (err.code === 11000) {
        throw new ConflictException('Attribute Value already exists');
      }
      return response.status(HttpStatus.BAD_REQUEST).json({
        statusCode: 400,
        message: 'Error: Attribute Value not created!',
        error: 'Bad Request',
      });
    }
  }

  @Get()
  findAll() {
    return this.attributeValueService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.attributeValueService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Res() response: Response,
    @Param('id') id: string,
    @Body() updateAttributeValueDto: UpdateAttributeValueDto,
  ) {
    try {
      const attributeValue = await this.attributeValueService.update(
        id,
        updateAttributeValueDto,
      );
      return response.status(HttpStatus.OK).json({
        message: 'Attribute Value has been successfully updated',
        attributeValue,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }

  @Delete(':id')
  async remove(@Res() response: Response, @Param('id') id: string) {
    try {
      const attributeValue = await this.attributeValueService.remove(id);
      return response.status(HttpStatus.OK).json({
        message: 'Attribute Value has been successfully deleted',
        attributeValue,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }
}
