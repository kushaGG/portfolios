import { CreatePortfolioDto } from './create-portfolio.dto';
import { PartialType } from '@nestjs/swagger';

export class UpdatePortfolioDto extends PartialType(CreatePortfolioDto) {}
