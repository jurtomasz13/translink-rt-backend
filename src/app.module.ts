import { Module } from '@nestjs/common';
import { v1Module } from './v1/v1.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { CacheModule } from '@nestjs/cache-manager';

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
    CacheModule.register({
      isGlobal: true,
      max: 20,
      ttl: 6000,
    }),
    v1Module,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
