import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  MinLength,
  Validate,
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ name: 'MatchesPassword', async: false })
export class MatchesPassword implements ValidatorConstraintInterface {
  validate(text: string, args: any) {
    return text === args.object.password;
  }

  defaultMessage(args: ValidationArguments) {
    return 'Passwords do not match';
  }
}

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
  @Validate(MatchesPassword, {
    message: 'Passwords do not match',
  })
  passwordRepeat: string;
}
