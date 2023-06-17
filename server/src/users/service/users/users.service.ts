import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { validate } from 'class-validator';
import { User } from 'src/typeorm/entities/User';
import {
  CreateUserParams,
  CreateUserProfileParams,
  UpdateUserParams,
} from 'src/utils/types';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async findUsers() {
    return this.userRepository.find();
  }

  async findOne(username: string): Promise<User | undefined> {
    const result = this.userRepository.findOneBy({ username });
    return result;
  }

  async createUser(userDetails: CreateUserParams) {
    const newUser = this.userRepository.create({ ...userDetails });
    const result = await this.userRepository.save(newUser);

    return result;
  }

  // async validateUser(username: string, password: string) {
  //   const errors = await validate(new User());
  //   return errors;
  // }

  updateUser(id: number, userDetails: UpdateUserParams) {
    return this.userRepository.update(
      {
        id,
      },
      { ...userDetails },
    );
  }

  deleteUser(id: number) {
    return this.userRepository.delete({ id });
  }

  async createUserProfile(
    id: number,
    createUserProfileDetails: CreateUserProfileParams,
  ) {
    const user = await this.userRepository.findOneBy({ id });

    if (!user) {
      throw new HttpException(
        'User not found. Cannot create Profile',
        HttpStatus.BAD_REQUEST,
      );
    }

    return this.userRepository.save(user);
  }
}
