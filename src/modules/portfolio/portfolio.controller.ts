import {
  Controller,
  Body,
  Param,
  Get,
  Post,
  Put,
  Delete,
  Request,
  UseGuards,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { PortfolioService } from './portfolio.service';
import { JwtAuthGuard } from '../auth/auth.guard';
import { DeleteResult, UpdateResult } from 'typeorm';
import { Portfolio } from './portfolio.entity';

@Controller('portfolio')
export class PortfolioController {
  constructor(private readonly portfolioService: PortfolioService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  create(@Request() request, @Body() body: Portfolio): Promise<Portfolio> {
    return this.portfolioService.create({ ...body, userId: request.user.id });
  }

  @Get('my')
  @UseGuards(JwtAuthGuard)
  getMy(@Request() request): Promise<Portfolio[]> {
    return this.portfolioService.find({ userId: request.user.id });
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  update(
    @Request() request,
    @Param('id') id: number,
    @Body() body: Partial<Portfolio>,
  ): Promise<UpdateResult> {
    return this.portfolioService.update(id, body, 'userId', request.user.id);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(@Request() request, @Param('id') id: number): Promise<DeleteResult> {
    return this.portfolioService.delete(id, 'userId', request.user.id);
  }
}
