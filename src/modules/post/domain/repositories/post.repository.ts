import { Injectable, NotFoundException } from '@nestjs/common';
import { DBClient } from 'shared/infrastructure/db/DB.client';
import { PostDto } from '../dtos/post.dto';
import { Post } from '@prisma/client';

@Injectable()
export class PostRepository {
  constructor(private readonly dbClient: DBClient) {}

  async getPosts(authorId: number | null) {
    const posts = await this.dbClient.getPrisma().post.findMany({
      ...(authorId ? { where: { authorId: +authorId } } : {}),
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        _count: true,
        author: {
          select: {
            name: true,
            photo: true,
          },
        },
        comments: {
          select: {
            content: true,
            createdAt: true,
          },
          orderBy: {
            createdAt: 'desc',
          },
        },
      },
    });

    return posts;
  }

  async getPost(id: number) {
    const post = await this.dbClient.getPrisma().post.findFirst({
      where: { id: +id },
      include: {
        _count: true,
        author: {
          select: {
            id: true,
            name: true,
            photo: true,
          },
        },
        comments: {
          select: {
            id: true,
            content: true,
            createdAt: true,
          },
          orderBy: {
            createdAt: 'desc',
          },
        },
      },
    });

    if (!post) throw new NotFoundException('invaid post id');

    return post;
  }

  async upsertPost(post: PostDto) {
    const { id = undefined, content, authorId } = post;

    let upserPost: Post;

    if (id)
      upserPost = await this.dbClient.getPrisma().post.update({
        where: { id },
        data: { content, authorId },
      });
    else
      upserPost = await this.dbClient.getPrisma().post.create({
        data: { content, authorId },
      });

    return await this.getPost(upserPost.id);
  }

  async removePost(id: number) {
    try {
      const post = await this.dbClient.getPrisma().post.delete({
        where: { id: +id },
      });

      if (!post) throw new NotFoundException('invaid post id');

      return post;
    } catch (error) {
      throw new NotFoundException('invaid post id');
    }
  }

  //   async getpost(postId: number) {
  //     const post = await this.dbClient.getPrisma().post.findFirstOrThrow({
  //       where: { id: postId },
  //     });

  //     return post;
  //   }
}
