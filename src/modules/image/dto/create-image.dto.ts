import { IsNotEmpty, IsString, Length } from 'class-validator';
import { Transform } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class CreateImageDto {
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

  @ApiProperty()
  @IsNotEmpty()
  @Transform(({ value }) => Number(value))
  portfolioId: number;

  @ApiProperty({ type: 'string', format: 'binary' })
  file: any;
}
