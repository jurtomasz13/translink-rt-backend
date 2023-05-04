import { Module } from '@nestjs/common';
import { UsersModule } from './user/users.module';

@Module({
  imports: [UsersModule],
  controllers: [],
  providers: [],
})
export class v1Module {}
