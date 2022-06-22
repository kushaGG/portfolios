import { DataSource } from 'typeorm';
import { User } from '../user/user.entity';
import Config from '../../config';
import { Portfolio } from '../portfolio/portfolio.entity';

export default new DataSource({
  type: 'postgres',
  ...Config.database,
  entities: [User, Portfolio],
  migrationsTableName: 'migrations',
  migrationsRun: true,
  migrations: ['dist/database/migrations/*.js'],
});
