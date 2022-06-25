import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import configuration from './config/configuration';
import { UserModule } from './modules/user/user.module';
import { PortfolioModule } from './modules/portfolio/portfolio.module';
import { ImageModule } from './modules/image/image.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    UserModule,
    PortfolioModule,
    ImageModule,
  ],
})
export class AppModule {}
