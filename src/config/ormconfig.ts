// ormconfig.ts
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';
// import * as path from 'path';

dotenv.config();

// const filePathPattern = path.join(
//   'dist',
//   'src',
//   'modules',
//   '**',
//   '*.entity.js',
// );
// const fileCommonPattern = path.join('dist', 'src', '**', '*.entity.js');

const config: TypeOrmModuleOptions = {
  type: process.env.DB_CONNECTION === 'postgres' ? 'postgres' : 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT) || 5432,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  // entities: [filePathPattern, fileCommonPattern],
  entities: [__dirname + '/../**/*.entity.{js,ts}'],
  synchronize: true,
};

export default config;
