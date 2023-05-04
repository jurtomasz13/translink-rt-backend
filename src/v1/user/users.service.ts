import {
  BadRequestException,
  ConflictException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { User } from './users.schema';
import { CreateUserDto, UpdateUserDto } from './users.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async create(createUserDto: CreateUserDto) {
    const user = await this.userModel.findOne({ email: createUserDto.email });
    if (user)
      throw new ConflictException(
        'User with this email address already exists',
      );

    const newUser = new this.userModel(createUserDto);
    return newUser.save();
  }

  async findAll() {
    const users = await this.userModel.find();
    if (users.length === 0) throw new NotFoundException('Users not found');

    return users;
  }

  async findOne(_id: string) {
    if (!Types.ObjectId.isValid(_id))
      throw new BadRequestException('ID is in an invalid format');

    const user = await this.userModel.findOne({ _id });
    if (!user) throw new NotFoundException(`User with _id: ${_id} not found`);

    return user;
  }

  async update(_id: string, updateUserDto: UpdateUserDto) {
    if (!Types.ObjectId.isValid(_id))
      throw new BadRequestException('ID is in an invalid format');

    const user = await this.userModel.updateOne({ _id }, updateUserDto, {
      new: true,
    });
    if (!user) throw new NotFoundException(`User with _id: ${_id} not found`);

    return user;
  }

  async remove(_id: string) {
    if (!Types.ObjectId.isValid(_id))
      throw new BadRequestException('ID is in an invalid format');

    const user = await this.userModel.deleteOne({ _id });
    if (!user) throw new NotFoundException(`User with _id: ${_id} not found`);

    return new HttpException(
      `User with _id: ${_id} deleted successfully`,
      HttpStatus.NO_CONTENT,
    );
  }
}
