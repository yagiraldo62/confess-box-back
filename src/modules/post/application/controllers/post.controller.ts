import {
  Controller,
  Post,
  Req,
  UseGuards,
  Body,
  ValidationPipe,
  Param,
  Get,
  Delete,
} from '@nestjs/common';
import { JwtAuthGuard } from 'modules/auth/application/guards/JwtAuth.guard';
import { PostService } from 'modules/post/domain/services/post.service';
import { PostDto } from 'modules/post/domain/dtos/post.dto';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Get()
  async getPosts() {
    try {
      const posts = await this.postService.getPosts(null);
      return posts;
    } catch (error) {
      console.error({ error });
      throw error;
    }
  }

  @Get('user/:id')
  async getUserPosts(@Param('id') id: number) {
    try {
      const posts = await this.postService.getPosts(id);
      return posts;
    } catch (error) {
      console.error({ error });
      throw error;
    }
  }

  @Get(':id')
  async getPost(@Param('id') id: number) {
    try {
      const post = await this.postService.getPost(id);
      return post;
    } catch (error) {
      console.error({ error });
      throw error;
    }
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  async upsertPost(@Body(ValidationPipe) body: PostDto, @Req() req) {
    try {
      const post = await this.postService.upserPost({
        ...body,
        authorId: req.user.id,
      });
      return post;
    } catch (error) {
      console.error({ error });
      throw error;
    }
  }

  @Delete(':id')
  async removePost(@Param('id') id: number) {
    try {
      const post = await this.postService.removePost(id);
      return post;
    } catch (error) {
      console.error({ error });
      throw error;
    }
  }
}
