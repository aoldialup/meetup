import {
  Body,
  Controller,
  Post,
  HttpCode,
  HttpStatus,
  UseGuards,
  Res,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from '../service/auth.service';
import { LoginDto as SignInDto, SignupDto } from 'src/utils/types';
import { AuthGuard } from '../auth.guard';
import { UsersService } from 'src/users/service/users/users.service';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private usersService: UsersService,
  ) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body() signInDto: SignInDto) {
    return this.authService.signIn(signInDto.username, signInDto.password);
  }

  //@UseGuards(AuthGuard)
  @Post('signup')
  async signup(@Res() trash: Response, @Body() signupDto: SignupDto ) {
    const user = await this.usersService.createUser({ ...signupDto });
    const token = await this.authService.signIn(
      signupDto.username,
      signupDto.password,
    );
    if (!token) {
      throw new UnauthorizedException();
    }
    trash.headers['authorization'] = `Bearer ${token}`;
  }
}
