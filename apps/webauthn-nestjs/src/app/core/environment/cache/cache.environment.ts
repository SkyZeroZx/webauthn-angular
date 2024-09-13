import { env } from 'process';
import { config } from 'dotenv';
import { CacheConfig } from './cache.interface';

config();

export const cacheConfig: CacheConfig = {
	host: env.CACHE_HOST,
	name: env.CACHE_NAME,
	username: env.CACHE_USERNAME,
	password: env.CACHE_PASSWORD,
	port: Number(env.CACHE_PORT),
	ttl: Number(env.CACHE_TTL),
	tls: JSON.parse(env.CACHE_TLS)
};
