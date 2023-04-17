import { IsString, IsNumber, IsNotEmpty, IsOptional } from 'class-validator';

export class CommentDto {
  @IsNotEmpty()
  @IsNumber()
  postId: number;

  @IsOptional()
  @IsNumber()
  authorId: number;

  @IsNotEmpty()
  @IsString()
  content: string;
}
