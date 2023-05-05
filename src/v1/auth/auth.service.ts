import {
  ForbiddenException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(email: string, password: string) {
    const user = await this.usersService.findOneByEmail(email);

    if (!user)
      throw new NotFoundException(`User with email: ${email} not found`);

    if (user.isDisabled)
      throw new ForbiddenException(`User with email: ${email} is disabled`);

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new UnauthorizedException('Invalid credentials');

    const payload = {
      sub: user._id,
      email: user.email,
    };

    return {
      access_token: await this.jwtService.signAsync(payload),
      token_type: 'Bearer',
    };
  }
}
