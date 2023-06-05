import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config/dist';
import { DatabaseModule } from './database/database.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: './env/local.env',
    }),
    DatabaseModule,
    UsersModule,
  ],
})
export class AppModule {}
