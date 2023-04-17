import { Injectable } from '@nestjs/common';
import { PostRepository } from '../repositories/post.repository';
import { PostDto } from '../dtos/post.dto';

@Injectable()
export class PostService {
  constructor(private readonly postRepository: PostRepository) {}

  async getPost(id: number) {
    const post = await this.postRepository.getPost(id);
    return post;
  }

  async getPosts(authorId: number | null) {
    const post = await this.postRepository.getPosts(authorId);
    return post;
  }

  async upserPost(req: PostDto) {
    const post = await this.postRepository.upsertPost(req);
    return post;
  }
  async removePost(id: number) {
    const post = await this.postRepository.removePost(id);
    return post;
  }
}
