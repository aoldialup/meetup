import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ClubsService } from '../service/clubs.service';
import { CreateClubParams } from 'src/utils/types';

enum ClubCategory {
  'RoadRunner',
  'Womens',
  'City',
  'Trail',
  'Endurance',
}

@Controller('clubs')
export class ClubsController {
  constructor(private clubsService: ClubsService) {}

  @Get()
  async findClubs() {
    const result = await this.clubsService.findClubs();
    return result;
  }

  /*
    @Put(':id')
  async updateUserById(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    await this.usersService.updateUser(id, updateUserDto);
  }*/

  @Get('/states')
  async findStates() {
    const result = await this.clubsService.getStates();
    return result;
  }

  @Get('/categories')
  async findCategories() {
    const result = Object.values(ClubCategory).filter((v) => isNaN(Number(v)));
    return result;
  }

  @Get(':id')
  async findClub(@Param('id', ParseIntPipe) id: number) {
    const result = await this.clubsService.findClubs(id);
    console.log(result);
    return result;
  }

  @Delete(':id')
  async deleteClub(@Param('id', ParseIntPipe) id: number) {
    const result = await this.clubsService.deleteClub(id);
    return result;
  }

  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
  async createClub(@Body() createClubDto: CreateClubParams) {
    const result = await this.clubsService.createClub(createClubDto);
    return result;
  }
}
