import { DataSource } from 'typeorm';
import { User } from '../user/user.entity';
import Config from '../../config';

export default new DataSource({
  type: 'postgres',
  ...Config.database,
  entities: [User],
  migrationsTableName: 'migrations',
  migrationsRun: true,
  migrations: ['dist/database/migrations/*.js'],
});
