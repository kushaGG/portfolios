import { IsNotEmpty, IsString, Length } from 'class-validator';

export class AddCommentDto {
  @IsString()
  @IsNotEmpty()
  @Length(1, 120)
  comment: string;
}
