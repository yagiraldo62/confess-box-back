import { Test } from '@nestjs/testing';
import { PostRepository } from 'modules/post/domain/repositories/post.repository';
import { PostController } from './post.controller';
import { PostService } from 'modules/post/domain/services/post.service';
import { DBClient } from 'shared/infrastructure/db/DB.client';
import { AuthRepository } from 'modules/auth/domain/repositories/auth.repository';
import { JwtService } from 'modules/auth/domain/service/jwt.service';
import { PostDto } from 'modules/post/domain/dtos/post.dto';
import postsMock from 'mocks/post/posts.mock';
import postMock from 'mocks/post/post.mock';
describe('PostController', () => {
  let postController: PostController;
  let postService: PostService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [PostController],
      providers: [
        PostService,
        PostRepository,
        DBClient,
        AuthRepository,
        JwtService,
      ],
    }).compile();

    postService = moduleRef.get<PostService>(PostService);
    postController = moduleRef.get<PostController>(PostController);
  });

  describe('getPosts', () => {
    it('should return an array of posts', async () => {
      const result = postsMock;
      jest.spyOn(postService, 'getPosts').mockResolvedValue(result);
      expect(await postController.getPosts()).toBe(result);
    });
  });

  describe('getUserPosts', () => {
    it('should return an array of posts for a given user id', async () => {
      const result = postsMock;
      jest.spyOn(postService, 'getPosts').mockResolvedValue(result);

      expect(await postController.getUserPosts(1)).toBe(result);
    });
  });

  describe('getPost', () => {
    it('should return a single post for a given id', async () => {
      const result = postMock;
      jest.spyOn(postService, 'getPost').mockResolvedValue(result);

      expect(await postController.getPost(1)).toBe(result);
    });
  });

  describe('upsertPost', () => {
    it('should create a new post', async () => {
      const dto: PostDto = { content: 'Test content' };
      const user = { id: 1 };
      const result = postMock;
      jest.spyOn(postService, 'upserPost').mockResolvedValue(result);

      expect(await postController.upsertPost(dto, { user })).toBe(result);
    });
  });

  describe('removePost', () => {
    it('should delete a post for a given id', async () => {
      const result = postMock;
      jest.spyOn(postService, 'removePost').mockResolvedValue(result);

      expect(await postController.removePost(1)).toBe(result);
    });
  });
});
