import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class DBClient {
  private static readonly prisma: PrismaClient = new PrismaClient();

  async connect() {
    await DBClient.prisma.$connect();
  }

  async disconnect() {
    await DBClient.prisma.$disconnect();
  }

  getPrisma() {
    return DBClient.prisma;
  }
}
