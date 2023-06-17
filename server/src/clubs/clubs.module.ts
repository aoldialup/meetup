import { UsersService } from 'src/users/service/users/users.service';
import { Module } from '@nestjs/common';
import { User } from 'src/typeorm/entities/User';
import { UsersController } from 'src/users/controllers/users/users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Address } from 'src/typeorm/entities/Address';
import { Club } from 'src/typeorm/entities/Club';
import { ClubsService } from './service/clubs.service';
import { ClubsController } from './controller/clubs.controller';
import { State } from 'src/typeorm/entities/State';

@Module({
  imports: [TypeOrmModule.forFeature([User, Address, Club, State])],
  controllers: [ClubsController],
  providers: [UsersService, ClubsService],
})
export class ClubsModule {}
