import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { AuthModule } from '../auth/auth.module';
import { portfolioProviders } from './portfolio.providers';
import { PortfolioController } from './portfolio.controller';
import { PortfolioService } from './portfolio.service';
import { UserModule } from '../user/user.module';

@Module({
  imports: [DatabaseModule, AuthModule, UserModule],
  controllers: [PortfolioController],
  providers: [...portfolioProviders, PortfolioService],
  exports: [PortfolioService],
})
export class PortfolioModule {}
