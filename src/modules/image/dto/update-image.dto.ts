import { CreateImageDto } from './create-image.dto';
import { OmitType, PartialType } from '@nestjs/swagger';

export class UpdateImageDto extends PartialType(
  OmitType(CreateImageDto, ['portfolioId']),
) {}
