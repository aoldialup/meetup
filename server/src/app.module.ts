import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './typeorm/entities/User';
import { UsersModule } from './users/users.module';
import { ClubsController } from './clubs/controller/clubs.controller';
import { ClubsModule } from './clubs/clubs.module';
import { Club } from './typeorm/entities/Club';
import { Address } from './typeorm/entities/Address';
import { State } from './typeorm/entities/State';
import { ControllerController } from './states/controller/controller.controller';
import { StatesService } from './states/service/states.service';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'EpicGamer123',
      database: 'meetup',
      entities: [User, Club, Address, State],
      synchronize: true,
    }),
    UsersModule,
    ClubsModule,
    AuthModule,
  ],
  controllers: [AppController, ControllerController],
  providers: [AppService, StatesService],
})
export class AppModule {}
