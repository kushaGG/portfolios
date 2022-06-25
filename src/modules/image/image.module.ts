import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { AuthModule } from '../auth/auth.module';
import { ImageController } from './image.controller';
import { imageProviders } from './image.providers';
import { ImageService } from './image.service';
import { FilesService } from '../files/files.service';
import { PortfolioService } from '../portfolio/portfolio.service';
import { portfolioProviders } from '../portfolio/portfolio.providers';

@Module({
  imports: [DatabaseModule, AuthModule],
  controllers: [ImageController],
  providers: [
    ...imageProviders,
    ...portfolioProviders,
    ImageService,
    FilesService,
    PortfolioService,
  ],
})
export class ImageModule {}
