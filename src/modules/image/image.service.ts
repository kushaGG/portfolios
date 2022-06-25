import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { AbstractService } from '../../config/abstract.service';
import { Image } from './image.entity';
import { DeleteResult, Repository } from 'typeorm';
import { FilesService } from '../files/files.service';
import { PortfolioService } from '../portfolio/portfolio.service';

@Injectable()
export class ImageService extends AbstractService<Image> {
  constructor(
    @Inject('IMAGE_REPOSITORY')
    private imageRepository: Repository<Image>,
    private readonly filesService: FilesService,
    private readonly portfolioService: PortfolioService,
  ) {
    super(imageRepository);
  }

  async create(doc, ...args): Promise<Image> {
    const { file } = Object.fromEntries(args);

    doc.image = await this.filesService.uploadPublicFile(
      file.buffer,
      file.originalname,
    );

    return super.create(doc);
  }

  async update(id: number, updateDoc, ...args) {
    const { userId, file, isComment } = Object.fromEntries(args);

    if (isComment) {
      return super.update(id, updateDoc);
    }

    if (userId) {
      const [isValid, imageEntity] = await this.validate(id, userId, 'delete');
      if (isValid) {
        if (file) {
          await this.filesService.deletePublicFile(
            imageEntity.image.split('/').pop(),
          );

          updateDoc.image = await this.filesService.uploadPublicFile(
            file.buffer,
            file.originalname,
          );
        }

        return super.update(id, updateDoc);
      }
    } else {
      throw new HttpException(
        'Internal Server Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async delete(id: number, ...args): Promise<DeleteResult> {
    const { userId } = Object.fromEntries(args);
    if (userId) {
      const [isValid, imageEntity] = await this.validate(id, userId, 'delete');
      if (isValid) {
        await this.filesService.deletePublicFile(
          imageEntity.image.split('/').pop(),
        );
        return super.delete(id);
      }
    } else {
      throw new HttpException(
        'Internal Server Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async addComment(id: number, { comment }): Promise<Image> {
    const image = await this.findOne({ id });
    if (!image) {
      throw new HttpException('Image not Found', HttpStatus.NOT_FOUND);
    } else {
      const comments = image.comments;
      comments.push(comment);
      await this.update(id, { comments }, ['isComment', true]);
      return this.findOne({ id });
    }
  }

  private async validate(id, userId, callbackTitle): Promise<[boolean, Image]> {
    const image = await this.findOne({ id });
    if (image) {
      const portfolio = await this.portfolioService.findOne(image.portfolioId);
      if (portfolio.userId !== userId) {
        throw new HttpException(
          `You can't ${callbackTitle} that's image`,
          HttpStatus.CONFLICT,
        );
      } else {
        return [true, image];
      }
    } else {
      throw new HttpException('Image not Found', HttpStatus.NOT_FOUND);
    }
  }
}
