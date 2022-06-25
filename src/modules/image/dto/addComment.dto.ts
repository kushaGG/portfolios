import { IsNotEmpty, IsString, Length } from 'class-validator';
import { ApiProperty, ApiTags } from '@nestjs/swagger';

@ApiTags('AddCommentDTO')
export class AddCommentDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Length(1, 120)
  comment: string;
}
