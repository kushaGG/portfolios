import { DataSource } from 'typeorm';
import { Portfolio } from './portfolio.entity';

export const portfolioProviders = [
  {
    provide: 'PORTFOLIO_REPOSITORY',
    useFactory: (dataSourse: DataSource) => dataSourse.getRepository(Portfolio),
    inject: ['DATA_SOURCE'],
  },
];
