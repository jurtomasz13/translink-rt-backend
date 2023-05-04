import { IsEmail, IsOptional, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  email: string;

  @MinLength(6)
  password: string;
}

// Only for CRUD purposes - won't be used since I'm not implementing updating a user on the frontend
export class UpdateUserDto {
  @IsOptional()
  email: string;

  @IsOptional()
  password: string;
}
