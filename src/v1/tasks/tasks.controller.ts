import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiNotFoundResponse,
  ApiTags,
} from '@nestjs/swagger';
import { TasksService } from './tasks.service';
import {
  Controller,
  UseGuards,
  Get,
  Post,
  Body,
  Request,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
  UseInterceptors,
} from '@nestjs/common';
import { AuthGuard } from '../guards/auth.guard';
import { ApiOkResponse } from '@nestjs/swagger';
import { CreateTaskDto, UpdateTaskDto } from './tasks.dto';
import { Task } from './tasks.schema';
import { CacheInterceptor } from '@nestjs/cache-manager';

@ApiTags('tasks')
@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller('tasks')
@UseInterceptors(CacheInterceptor)
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get()
  @ApiOkResponse()
  @ApiNotFoundResponse({ description: 'Users not found' })
  async get(@Request() req: any) {
    return this.tasksService.findUserTasks(req.user.email);
  }

  @Post()
  @ApiOkResponse()
  @ApiBadRequestResponse({ description: 'Invalid data' })
  async create(
    @Request() req: any,
    @Body() createTaskDto: CreateTaskDto,
  ): Promise<Task> {
    return this.tasksService.create(req.user.sub, createTaskDto);
  }

  @Patch(':id')
  @ApiOkResponse()
  @ApiBadRequestResponse({ description: 'ID is in an invalid format' })
  @ApiNotFoundResponse({ description: 'User not found' })
  async update(
    @Param('id') id: string,
    @Request() req: any,
    @Body() updateTaskDto: UpdateTaskDto,
  ): Promise<Task> {
    return this.tasksService.update(req.user.sub, id, updateTaskDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOkResponse()
  @ApiBadRequestResponse({ description: 'ID is in an invalid format' })
  @ApiNotFoundResponse({ description: 'Task not found' })
  async delete(@Param('id') id: string): Promise<void> {
    await this.tasksService.remove(id);
  }
}
