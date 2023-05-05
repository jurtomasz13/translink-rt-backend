import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { TasksModule } from './tasks/tasks.module';

@Module({
  imports: [UsersModule, TasksModule, AuthModule],
  controllers: [],
  providers: [],
})
export class v1Module {}
