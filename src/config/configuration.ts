import 'dotenv/config';

export default () => ({
  port: Number(process.env.PORT) || 3000,

  database: {
    host: process.env.DATABASE_HOST,
    port: Number(process.env.DATABASE_PORT),
    username: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
  },
});
