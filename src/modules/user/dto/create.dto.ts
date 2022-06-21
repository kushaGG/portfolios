import { IsNotEmpty, IsString, Length, Max } from 'class-validator';

export class CreateDto {
  @IsString()
  @IsNotEmpty()
  @Length(1, 120)
  username: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
