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
import { CreatePortfolioDto } from './dto/create-portfolio.dto';
import { UpdatePortfolioDto } from './dto/update-portfolio.dto';
import {
  ApiAcceptedResponse,
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import {
  IAcceptedResponse,
  IErrorResponse,
  IValidationErrorResponse,
} from '../../interfaces/response.interface';

@ApiTags('Portfolio')
@Controller('portfolio')
export class PortfolioController {
  constructor(private readonly portfolioService: PortfolioService) {}

  @ApiOperation({ summary: 'Create portfolio' })
  @ApiBearerAuth()
  @ApiCreatedResponse({ type: Portfolio, description: 'Success' })
  @ApiBadRequestResponse({
    type: IValidationErrorResponse,
    description: 'Validation error',
  })
  @ApiUnauthorizedResponse({
    type: IErrorResponse,
    description: 'Unauthorized',
  })
  @Post()
  @UseGuards(JwtAuthGuard)
  create(
    @Request() request,
    @Body() body: CreatePortfolioDto,
  ): Promise<Portfolio> {
    return this.portfolioService.create({ ...body, userId: request.user.id });
  }

  @ApiOperation({ summary: 'Receive my Portfolios' })
  @ApiBearerAuth()
  @ApiOkResponse({ type: [Portfolio], description: 'Success' })
  @Get('my')
  @UseGuards(JwtAuthGuard)
  getMy(@Request() request): Promise<Portfolio[]> {
    return this.portfolioService.find({
      userId: request.user.id,
    });
  }

  @ApiOperation({ summary: 'Update portfolio' })
  @ApiBearerAuth()
  @ApiAcceptedResponse({ type: IAcceptedResponse, description: 'Success' })
  @ApiUnauthorizedResponse({
    type: IErrorResponse,
    description: 'Unauthorized',
  })
  @ApiNotFoundResponse({ type: IErrorResponse, description: 'Not Found' })
  @ApiConflictResponse({ type: IErrorResponse, description: 'Conflict' })
  @ApiInternalServerErrorResponse({
    type: IErrorResponse,
    description: 'Internal Server Error',
  })
  @Put(':id')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.ACCEPTED)
  update(
    @Request() request,
    @Param('id') id: number,
    @Body() body: UpdatePortfolioDto,
  ): Promise<UpdateResult> {
    return this.portfolioService.update(id, body, 'userId', request.user.id);
  }

  @ApiOperation({ summary: 'Delete portfolio' })
  @ApiBearerAuth()
  @ApiNoContentResponse({ description: 'Success' })
  @ApiUnauthorizedResponse({
    type: IErrorResponse,
    description: 'Unauthorized',
  })
  @ApiNotFoundResponse({ type: IErrorResponse, description: 'Not Found' })
  @ApiConflictResponse({ type: IErrorResponse, description: 'Conflict' })
  @ApiInternalServerErrorResponse({
    type: IErrorResponse,
    description: 'Internal Server Error',
  })
  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(@Request() request, @Param('id') id: number): Promise<DeleteResult> {
    return this.portfolioService.delete(id, 'userId', request.user.id);
  }
}
