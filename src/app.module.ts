import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DataSource } from 'typeorm';
import { UsersModule } from './users/users.module';
import { User } from './users/user.entity';
import { ConfigModule } from '@nestjs/config/dist';
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: './env/local.env'
      //envFilePath: '../env/local.env'
    }),
    TypeOrmModule.forRoot({
    type: 'mssql',
    host: process.env.DB_HOST,
    port:  +process.env.DB_PORT,
    //name: "default",
    username:     process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    entities: [User],
    synchronize: true,
    options: { encrypt: false },
    retryAttempts: 1,
  }),
  UsersModule

  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(private dataSource: DataSource){}
}
