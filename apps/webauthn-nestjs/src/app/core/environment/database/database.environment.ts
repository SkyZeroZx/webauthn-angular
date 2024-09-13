import { env } from 'process';
import { config } from 'dotenv';
import { DatabaseConfig } from './database.interface';

config();

export const databaseConfig: DatabaseConfig = {
	host: env.DATABASE_HOST,
	port: Number(env.DATABASE_PORT),
	database: env.DATABASE_NAME,
	username: env.DATABASE_USERNAME,
	password: env.DATABASE_PASSWORD,
	autoLoadEntities: JSON.parse(env.DATABASE_AUTO_LOAD_ENTITIES),
	synchronize: JSON.parse(env.DATABASE_SYNCHRONIZE),
	logging: JSON.parse(env.DATABASE_LOGGING),
	ssl : JSON.parse(env.DATABASE_SSL)
};
