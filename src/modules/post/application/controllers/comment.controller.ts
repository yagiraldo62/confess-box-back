import {
  Controller,
  Post,
  Req,
  UseGuards,
  Body,
  ValidationPipe,
  Param,
  Delete,
} from '@nestjs/common';
import { JwtAuthGuard } from 'modules/auth/application/guards/JwtAuth.guard';
import { CommentDto } from 'modules/post/domain/dtos/comment.dto';
import { CommentService } from 'modules/post/domain/services/comment.service';

@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async createComment(@Body(ValidationPipe) body: CommentDto, @Req() req) {
    try {
      const comment = await this.commentService.createComment({
        ...body,
        authorId: req.user.id,
      });
      return comment;
    } catch (error) {
      console.error({ error });
      throw error;
    }
  }

  @Delete(':id')
  async removeComment(@Param('id') id: number) {
    try {
      const comment = await this.commentService.removeComment(id);
      return comment;
    } catch (error) {
      console.error({ error });
      throw error;
    }
  }
}
