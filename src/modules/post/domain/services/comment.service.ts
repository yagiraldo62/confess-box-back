import { Injectable } from '@nestjs/common';
import { CommentRepository } from '../repositories/comment.repository';
import { CommentDto } from '../dtos/comment.dto';

@Injectable()
export class CommentService {
  constructor(private readonly commentRepository: CommentRepository) {}

  async createComment(req: CommentDto) {
    const comment = await this.commentRepository.createComment(req);
    return comment;
  }
  async removeComment(id: number) {
    const comment = await this.commentRepository.removeComment(id);
    return comment;
  }
}
