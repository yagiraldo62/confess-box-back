import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class JwtService {
  sign(user: User) {
    const token = jwt.sign({ sub: user.id }, process.env.APP_SECRET, {
      expiresIn: '24h',
    });
    return token;
  }

  verify(token: string) {
    try {
      const decoded = jwt.verify(token, process.env.APP_SECRET);
      return decoded;
    } catch (err) {
      console.error(err);
      throw err;
    }
  }
}
