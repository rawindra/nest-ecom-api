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
import { AttributeService } from './attribute.service';
import { CreateAttributeDto } from './dto/create-attribute.dto';
import { UpdateAttributeDto } from './dto/update-attribute.dto';
import { Response } from 'express';

@Controller('attribute')
export class AttributeController {
  constructor(private readonly attributeService: AttributeService) {}

  @Post()
  async create(
    @Res() response: Response,
    @Body() createAttributeDto: CreateAttributeDto,
  ) {
    try {
      const attribute = await this.attributeService.create(createAttributeDto);

      return response.status(HttpStatus.CREATED).json({
        message: 'Attribute has been created successfully',
        attribute,
      });
    } catch (err) {
      if (err.code === 11000) {
        throw new ConflictException('Attribute already exists');
      }
      return response.status(HttpStatus.BAD_REQUEST).json({
        statusCode: 400,
        message: 'Error: Attribute not created!',
        error: 'Bad Request',
      });
    }
  }

  @Get()
  findAll() {
    return this.attributeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.attributeService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Res() response: Response,
    @Param('id') id: string,
    @Body() updateAttributeDto: UpdateAttributeDto,
  ) {
    try {
      const attribute = await this.attributeService.update(
        id,
        updateAttributeDto,
      );
      return response.status(HttpStatus.OK).json({
        message: 'Attribute has been successfully updated',
        attribute,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }

  @Delete(':id')
  async remove(@Res() response: Response, @Param('id') id: string) {
    try {
      const attribute = await this.attributeService.remove(id);
      return response.status(HttpStatus.OK).json({
        message: 'Attribute has been successfully deleted',
        attribute,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }
}
