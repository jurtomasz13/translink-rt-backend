import { Module } from '@nestjs/common';
import { v1Module } from './v1/v1.module';
import { RouterModule } from '@nestjs/core';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      expandVariables: true,
    }),
    MongooseModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        uri: configService.get<string>('DATABASE_URI'),
      }),
    }),
    RouterModule.register([
      {
        path: 'v1',
        module: v1Module,
      },
    ]),
    v1Module,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
