import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { UsersService } from '../services/users.service';
import {
  ApiBadRequestResponse,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CreateUserDto, UpdateUserDto } from '../dto/user.dto';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiCreatedResponse()
  @ApiConflictResponse({
    description: 'User with this email address already exists',
  })
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  @ApiOkResponse()
  @ApiNotFoundResponse({ description: 'Users not found exception' })
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  @ApiOkResponse()
  @ApiBadRequestResponse({ description: 'ID is in an invalid format' })
  @ApiNotFoundResponse({ description: 'User not found exception' })
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Patch(':id')
  @ApiOkResponse()
  @ApiBadRequestResponse({ description: 'ID is in an invalid format' })
  @ApiNotFoundResponse({ description: 'User not found exception' })
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  @ApiNoContentResponse()
  @ApiBadRequestResponse({ description: 'ID is in an invalid format' })
  @ApiNotFoundResponse({ description: 'User not found exception' })
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}
