import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateTaskDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  description: string;

  @ApiProperty()
  @IsOptional()
  @IsBoolean()
  isDone: boolean;
}

export class UpdateTaskDto {
  @ApiProperty()
  @IsBoolean()
  @IsOptional()
  isDone: boolean;
}
