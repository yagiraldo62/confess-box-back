import { IsString, IsNumber, IsNotEmpty, IsOptional } from 'class-validator';

export class PostDto {
  @IsNumber()
  @IsOptional()
  id?: number;

  @IsString()
  @IsNotEmpty()
  content: string;

  @IsNumber()
  @IsOptional()
  authorId?: number;
}
