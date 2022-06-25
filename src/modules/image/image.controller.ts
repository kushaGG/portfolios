import {
  Controller,
  Request,
  Post,
  Body,
  UseGuards,
  UseInterceptors,
  UploadedFile,
  Get,
  Delete,
  Param,
  HttpCode,
  HttpStatus,
  Put,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/auth.guard';
import { ImageService } from './image.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateImageDto } from './dto/create-image.dto';
import { UpdateImageDto } from './dto/update-image.dto';
import { AddCommentDto } from './dto/addComment.dto';
import { Image } from './image.entity';
import { DeleteResult, UpdateResult } from 'typeorm';
import {
  ApiAcceptedResponse,
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiConflictResponse,
  ApiConsumes,
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

@ApiTags('Image')
@Controller('image')
export class ImageController {
  constructor(private readonly imageService: ImageService) {}

  @ApiOperation({ summary: 'Create portfolio image' })
  @ApiConsumes('multipart/form-data')
  @ApiBearerAuth()
  @ApiCreatedResponse({ type: Image, description: 'Success' })
  @ApiBadRequestResponse({
    type: IValidationErrorResponse,
    description: 'Validation error',
  })
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
  @Post()
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('file'))
  create(
    @Request() { user },
    @Body() body: CreateImageDto,
    @UploadedFile() file,
  ): Promise<Image> {
    return this.imageService.create(body, ['userId', user.id], ['file', file]);
  }

  @ApiOperation({ summary: 'Receive images feed' })
  @ApiOkResponse({ type: [Image], description: 'Success' })
  @Get()
  getAll(): Promise<Image[]> {
    return this.imageService.find({ relations: ['portfolio'] });
  }

  @ApiOperation({ summary: 'Add comment to image' })
  @ApiOkResponse({ type: Image, description: 'Success' })
  @ApiBadRequestResponse({
    type: IValidationErrorResponse,
    description: 'Validation error',
  })
  @ApiNotFoundResponse({ type: IErrorResponse, description: 'Not Found' })
  @Put(':id/comment')
  addComment(@Param('id') id: number, @Body() body: AddCommentDto) {
    return this.imageService.addComment(id, body);
  }

  @ApiOperation({ summary: 'Update image' })
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
  @UseInterceptors(FileInterceptor('file'))
  @HttpCode(HttpStatus.ACCEPTED)
  update(
    @Request() { user },
    @Param('id') id: number,
    @Body() body: UpdateImageDto,
    @UploadedFile() file?,
  ): Promise<UpdateResult> {
    return this.imageService.update(
      id,
      body,
      ['userId', user.id],
      ['file', file],
    );
  }

  @ApiOperation({ summary: 'Delete image' })
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
  delete(@Request() { user }, @Param('id') id: number): Promise<DeleteResult> {
    return this.imageService.delete(id, ['userId', user.id]);
  }
}
