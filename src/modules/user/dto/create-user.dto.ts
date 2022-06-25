import { IsNotEmpty, IsString, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Length(1, 120)
  username: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Length(6, 32)
  password: string;
}
