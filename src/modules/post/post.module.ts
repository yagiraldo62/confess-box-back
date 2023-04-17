import { Module } from '@nestjs/common';
import { DBClient } from 'shared/infrastructure/db/DB.client';
import { PostService } from './domain/services/post.service';
import { PostRepository } from './domain/repositories/post.repository';
import { PostController } from './application/controllers/post.controller';
import { JwtService } from 'modules/auth/domain/service/jwt.service';
import { AuthRepository } from 'modules/auth/domain/repositories/auth.repository';
import { CommentService } from './domain/services/comment.service';
import { CommentRepository } from './domain/repositories/comment.repository';
import { CommentController } from './application/controllers/comment.controller';

@Module({
  controllers: [PostController, CommentController],
  providers: [
    DBClient,
    PostService,
    CommentService,
    PostRepository,
    CommentRepository,
    JwtService,
    AuthRepository,
  ],
})
export class PostModule {}
