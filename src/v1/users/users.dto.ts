import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsOptional, MinLength } from 'class-validator';

// Only for CRUD purposes - won't be used since I'm not implementing updating a user on the frontend
export class UpdateUserDto {
  @IsOptional()
  @IsEmail()
  @ApiPropertyOptional()
  email: string;

  @IsOptional()
  @MinLength(6)
  @ApiPropertyOptional()
  password: string;
}
