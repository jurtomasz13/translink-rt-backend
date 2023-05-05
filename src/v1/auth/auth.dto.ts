import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, Matches, MinLength } from 'class-validator';

export class SignInDto {
  @IsEmail()
  @ApiProperty()
  email: string;

  @MinLength(6)
  @ApiProperty()
  password: string;
}

export class SignUpDto {
  @IsEmail()
  @ApiProperty()
  email: string;

  @MinLength(6)
  @ApiProperty()
  password: string;

  @MinLength(6)
  @ApiProperty()
  @Matches('password', undefined, { message: 'Passwords do not match' })
  passwordRepeat: string;
}
