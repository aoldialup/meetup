import { SignupDto } from './../../utils/types';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/service/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async signIn(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(username);
    if (user?.password !== pass) {
      throw new UnauthorizedException();
    }

    const { password, ...result } = user;
    const jwt = this.jwtService.signAsync({
      id: user.id,
      
    });
    // TODO: Generate a JWT and return it here
    // instead of the user object
    return jwt;
  }

  async signup(signupDto: SignupDto): Promise<any> {
    const user = await this.usersService.createUser({ ...signupDto });
    return user;
  }
}
