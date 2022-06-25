import { IsNotEmpty, IsNumber, IsString, Length } from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateDto {
  @IsString()
  @IsNotEmpty()
  @Length(1, 120)
  title: string;

  @IsString()
  @IsNotEmpty()
  @Length(1, 320)
  description: string;

  @IsNotEmpty()
  @Transform(({ value }) => Number(value))
  portfolioId: number;
}
