import { DataSource } from 'typeorm';
import { User } from '../user/user.entity';
import Config from '../../config';
import { Portfolio } from '../portfolio/portfolio.entity';
import { Image } from '../image/image.entity';

export default new DataSource({
  type: 'postgres',
  ...Config.database,
  ssl: {
    rejectUnauthorized: false,
  },
  entities: [User, Portfolio, Image],
  migrationsTableName: 'migrations',
  migrationsRun: true,
  migrations: ['dist/database/migrations/*.js'],
});
