import ormconfig from './database.servise';

export const databaseProviders = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async () => {
      return ormconfig.initialize();
    },
  },
];
