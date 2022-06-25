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
import { CreateDto } from './dto/create.dto';
import { Image } from './image.entity';
import { DeleteResult, UpdateResult } from 'typeorm';
import { AddCommentDto } from './dto/addComment.dto';

@Controller('image')
export class ImageController {
  constructor(private readonly imageService: ImageService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('file'))
  create(
    @Request() request,
    @Body() body: CreateDto,
    @UploadedFile() file,
  ): Promise<Image> {
    return this.imageService.create(body, ['file', file]);
  }

  @Get()
  getAll(): Promise<Image[]> {
    return this.imageService.find({ relations: ['portfolio'] });
  }

  @Put(':id/comment')
  addComment(@Param('id') id: number, @Body() body: AddCommentDto) {
    return this.imageService.addComment(id, body);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('file'))
  update(
    @Request() { user },
    @Param('id') id: number,
    @Body() body: Partial<Image>,
    @UploadedFile() file?,
  ): Promise<UpdateResult> {
    return this.imageService.update(
      id,
      body,
      ['userId', user.id],
      ['file', file],
    );
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(@Request() { user }, @Param('id') id: number): Promise<DeleteResult> {
    return this.imageService.delete(id, ['userId', user.id]);
  }
}
