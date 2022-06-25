import { IsNotEmpty, IsString, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePortfolioDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Length(1, 120)
  title: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Length(1, 320)
  description: string;
}
