import {
  BadRequestException,
  ConflictException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Error, Model, MongooseError, Types } from 'mongoose';
import * as bcrypt from 'bcryptjs';
import { User } from './users.schema';
import { SignUpDto } from '../auth/auth.dto';
import { UpdateUserDto } from './users.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async create(signUpDto: SignUpDto) {
    const user = await this.userModel.findOne({ email: signUpDto.email });
    if (user)
      throw new ConflictException(
        'User with this email address already exists',
      );

    const { password } = signUpDto;
    const newUser = new this.userModel(signUpDto);
    const salt = await bcrypt.genSalt();
    newUser.password = await bcrypt.hash(password, salt);
    return newUser.save();
  }

  async findAll() {
    const users = await this.userModel.find();
    if (users.length === 0) throw new NotFoundException('Users not found');

    return users;
  }

  async findOne(key: Record<string, any>) {
    try {
      return this.userModel.findOne(key);
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
    }
  }

  async findOneById(_id: string) {
    if (!Types.ObjectId.isValid(_id))
      throw new BadRequestException('ID is in an invalid format');

    const user = await this.userModel.findOne({ _id });
    if (!user) throw new NotFoundException(`User with _id: ${_id} not found`);

    return user;
  }

  async findOneByEmail(email: string) {
    const user = await this.userModel.findOne({ email });
    if (!user)
      throw new NotFoundException(`User with email: ${email} not found`);

    return user;
  }

  async update(_id: string, updateUserDto: UpdateUserDto) {
    if (!Types.ObjectId.isValid(_id))
      throw new BadRequestException('ID is in an invalid format');

    const user = await this.userModel.findOneAndUpdate({ _id }, updateUserDto, {
      new: true,
    });
    if (!user) throw new NotFoundException(`User with _id: ${_id} not found`);

    return user;
  }

  async remove(_id: string) {
    if (!Types.ObjectId.isValid(_id))
      throw new BadRequestException('ID is in an invalid format');

    const user = await this.userModel.deleteOne({ _id });
    if (user.deletedCount === 0)
      throw new NotFoundException(`User with _id: ${_id} not found`);

    return;
  }
}
