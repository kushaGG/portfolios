import { IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateDto {
  @IsString()
  @IsNotEmpty()
  @Length(1, 120)
  title: string;

  @IsString()
  @IsNotEmpty()
  @Length(1, 320)
  description: string;
}
