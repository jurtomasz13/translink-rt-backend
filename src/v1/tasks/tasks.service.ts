import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Task } from './tasks.schema';
import { CreateTaskDto, UpdateTaskDto } from './tasks.dto';
import { UsersService } from '../users/users.service';

@Injectable()
export class TasksService {
  constructor(
    @InjectModel(Task.name) private taskModel: Model<Task>,
    private usersService: UsersService,
  ) {}

  async create(id: string, createTaskDto: CreateTaskDto) {
    const session = await this.taskModel.startSession();
    let createdTask;

    try {
      const task = new this.taskModel(createTaskDto);
      const user = await this.usersService.findOneById(id);

      task.user = user;
      await task.save({ session });

      user.tasks.push(task.id);
      await user.save({ session });

      createdTask = task;
    } finally {
      session.endSession();
    }
    return createdTask;
  }

  async findUserTasks(email: string) {
    const user = await this.usersService.findOneByEmail(email);
    const { tasks } = await user.populate('tasks');

    if (tasks.length === 0) throw new NotFoundException('Tasks not found');

    return tasks;
  }

  async findAll() {
    const tasks = await this.taskModel.find();
    if (tasks.length === 0) throw new NotFoundException('Tasks not found');

    return tasks;
  }

  async findOneById(_id: string) {
    if (!Types.ObjectId.isValid(_id))
      throw new BadRequestException('ID is in an invalid format');

    const task = await this.taskModel.findOne({ _id });
    if (!task) throw new NotFoundException('Task not found');

    return task;
  }

  async update(userId: string, taskId: string, updateTaskDto: UpdateTaskDto) {
    const task = await this.taskModel.findOneAndUpdate(
      { _id: taskId, user: userId },
      updateTaskDto,
      { new: true },
    );

    if (!task) throw new NotFoundException('Task not found');

    return task;
  }

  async remove(_id: string) {
    if (!Types.ObjectId.isValid(_id))
      throw new BadRequestException('ID is in an invalid format');

    const task = await this.taskModel.deleteOne({ _id });
    if (task.deletedCount === 0) throw new NotFoundException('Task not found');

    return;
  }
}
