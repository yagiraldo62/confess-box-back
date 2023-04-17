import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from 'src/modules/auth/domain/service/auth.service';
import { GoogleUserRequestDto } from 'modules/auth/domain/dtos/googleUser.dto';
import { JwtAuthGuard } from '../guards/JwtAuth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('user')
  @UseGuards(JwtAuthGuard)
  async userInfo(@Req() req) {
    return req.user;
  }

  @Get('google')
  @UseGuards(AuthGuard('google'))
  async googleAuth(@Req() req) {
    console.log({ req });
  }

  @Get('google/redirect')
  @UseGuards(AuthGuard('google'))
  async googleAuthRedirect(@Req() req: GoogleUserRequestDto, @Res() res) {
    try {
      const { token } = await this.authService.googleLogin(req);
      return res.redirect(`${process.env.APP_FRONT_URL}/auth/${token}`);
    } catch (error) {
      return error;
    }
  }
}
