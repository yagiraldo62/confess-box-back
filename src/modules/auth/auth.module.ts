import { Module } from '@nestjs/common';
import { GoogleStrategy } from './infrastructure/strategies/google.strategy';
import { AuthService } from './domain/service/auth.service';
import { AuthRepository } from './domain/repositories/auth.repository';
import { DBClient } from 'shared/infrastructure/db/DB.client';
import { JwtService } from './domain/service/jwt.service';
import { AuthController } from './application/controllers/auth.controller';

@Module({
  controllers: [AuthController],
  providers: [
    DBClient,
    AuthService,
    JwtService,
    AuthRepository,
    GoogleStrategy,
  ],
})
export class AuthModule {}
