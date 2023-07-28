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
  UseGuards,
  Request,
  ConflictException,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Response } from 'express';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(
    @Res() response: Response,
    @Body() createUserDto: CreateUserDto,
  ) {
    try {
      const user = await this.userService.create(createUserDto);

      return response.status(HttpStatus.CREATED).json({
        message: 'User has been created successfully',
        user,
      });
    } catch (err) {
      if (err.code === 11000) {
        throw new ConflictException('User email already exists');
      }
      return response.status(HttpStatus.BAD_REQUEST).json({
        statusCode: 400,
        message: 'Error: User not created!',
        error: 'Bad Request',
      });
    }
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  @Post('email')
  findByEmail(@Body('email') email: string) {
    return this.userService.findByEmail(email);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async update(
    @Res() response: Response,
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    try {
      const user = await this.userService.update(id, updateUserDto);
      return response.status(HttpStatus.OK).json({
        message: 'User has been successfully updated',
        user,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async remove(@Res() response: Response, @Param('id') id: string) {
    try {
      const user = await this.userService.remove(id);
      return response.status(HttpStatus.OK).json({
        message: 'User has been successfully deleted',
        user,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }
}
