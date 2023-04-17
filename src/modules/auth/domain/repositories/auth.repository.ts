import { GoogleUserDto } from '../dtos/googleUser.dto';
import { Injectable } from '@nestjs/common';
import { DBClient } from 'shared/infrastructure/db/DB.client';
import { UserDto } from '../dtos/user.dto';

@Injectable()
export class AuthRepository {
  constructor(private readonly dbClient: DBClient) {}

  async upsertGoogleUser(googleUser: GoogleUserDto) {
    const { email, firstName, lastName, picture } = googleUser;
    const userData: UserDto = {
      email,
      name: `${firstName} ${lastName}`,
      photo: picture,
    };
    const user = this.upsertUser(userData);

    return user;
  }

  async upsertUser(user: UserDto) {
    const { email } = user;
    const userUpsert = await this.dbClient.getPrisma().user.upsert({
      where: { email },
      create: user,
      update: user,
    });

    return userUpsert;
  }

  async getUser(userId: number) {
    const user = await this.dbClient.getPrisma().user.findFirstOrThrow({
      where: { id: userId },
    });

    return user;
  }
}
