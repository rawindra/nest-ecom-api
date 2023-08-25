import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './entities/user.entity';
import { hashPassword } from './bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectModel('User')
    private readonly userModel: Model<UserDocument>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    let password = hashPassword(createUserDto.password);
    const user = new this.userModel({ ...createUserDto, password });
    return user.save();
  }

  async findAll(): Promise<User[]> {
    const user = await this.userModel.find();

    if (!user || user.length == 0) {
      throw new NotFoundException('User not found!');
    }
    return user;
  }

  async findOne(id: string): Promise<User> {
    const user = await this.userModel.findById(id).exec();
    if (!user) {
      throw new NotFoundException(`User #${id} not found`);
    }
    return user;
  }

  async findByEmail(email: string) {
    const user = await this.userModel.findOne({ email: email });
    if (!user) {
      throw new NotFoundException(`User email ${email} not found`);
    }
    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const userExisintingWithEmail = await this.userModel.findOne({
      _id: { $ne: id },
      name: updateUserDto.email,
    });

    if (userExisintingWithEmail) {
      throw new ConflictException(`Email already exits`);
    }

    const user = await this.userModel.findByIdAndUpdate(id, updateUserDto, {
      new: true,
    });
    if (!user) {
      throw new NotFoundException(`User #${id} not found`);
    }
    return user;
  }

  async remove(id: string): Promise<User> {
    const user = await this.userModel.findByIdAndDelete(id);
    if (!user) {
      throw new NotFoundException(`User #${id} not found`);
    }
    return user;
  }
}
