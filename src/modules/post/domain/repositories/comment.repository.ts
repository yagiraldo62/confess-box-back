import { Injectable, NotFoundException } from '@nestjs/common';
import { DBClient } from 'shared/infrastructure/db/DB.client';
import { CommentDto } from '../dtos/comment.dto';

@Injectable()
export class CommentRepository {
  constructor(private readonly dbClient: DBClient) {}

  async createComment(commentData: CommentDto) {
    const { content, authorId, postId } = commentData;

    const comment = await this.dbClient.getPrisma().comment.create({
      data: { content, authorId, postId },
    });

    return comment;
  }

  async removeComment(id: number) {
    try {
      const comment = await this.dbClient.getPrisma().comment.delete({
        where: { id: +id },
      });

      if (!comment) throw new NotFoundException('invaid comment id');

      return comment;
    } catch (error) {
      throw new NotFoundException('invaid comment id');
    }
  }
}
