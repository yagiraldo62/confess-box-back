import { Injectable } from '@nestjs/common';
import {
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthRepository } from 'modules/auth/domain/repositories/auth.repository';
import { JwtService } from 'modules/auth/domain/service/jwt.service';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(
    private readonly authRepository: AuthRepository,
    private readonly jwtService: JwtService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedException(
        'Missing or invalid authorization header',
      );
    }

    const token = authHeader.split(' ')[1];
    try {
      const decoded = this.jwtService.verify(token);
      const { sub } = decoded;

      if (typeof sub !== 'number') {
        throw new UnauthorizedException('No sub in token');
      }

      const user = await this.authRepository.getUser(sub);

      if (!user) {
        throw new UnauthorizedException('Invalid token');
      }

      req.user = user;

      return true;
    } catch (err) {
      throw new UnauthorizedException('Invalid token');
    }
  }
}
