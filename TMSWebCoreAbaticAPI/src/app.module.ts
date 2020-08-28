import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppRestModule } from './app/apprest.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import Configuration from './config/configuration';

@Module({

  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [Configuration]
    }),
    TypeOrmModule.forRootAsync({
      imports: [ ConfigModule ],
      useFactory: (configService: ConfigService) => (
        {
          type: 'postgres',
          host: configService.get<string>('database.host', 'localhost'),
          port: configService.get<number>('database.port', 5432),
          username: configService.get<string>('database.username', 'postgres'),
          password: configService.get<string>('database.password', 'postgres'),
          database: configService.get<string>('database.database', 'postgres'),
          schema: configService.get<string>('database.schema', 'public'),
          autoLoadEntities: true,
          synchronize: configService.get<boolean>('database.synchronize', true),
          logging: configService.get<boolean>('database.logging', true),
          ssl: false,
        }
      ),
      inject: [ConfigService],
    }),
    AppRestModule,
  ],
  controllers: [

  ],
  providers: [

  ],
})
export class AppModule {}
