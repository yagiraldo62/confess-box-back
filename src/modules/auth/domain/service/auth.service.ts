import { Injectable, UnauthorizedException } from '@nestjs/common';
import { GoogleUserRequestDto } from '../dtos/googleUser.dto';
import { AuthRepository } from '../repositories/auth.repository';
import { JwtService } from 'modules/auth/domain/service/jwt.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly authRepository: AuthRepository,
    private readonly jwtService: JwtService,
  ) {}

  async googleLogin(req: GoogleUserRequestDto) {
    if (!req.user) {
      throw new UnauthorizedException('No user from google');
    }

    const user = await this.authRepository.upsertGoogleUser(req.user);
    const token = this.jwtService.sign(user);
    return {
      user,
      token,
    };
  }
}
