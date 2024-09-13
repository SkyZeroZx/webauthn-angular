import { redisStore } from 'cache-manager-redis-store';
import { cacheConfig } from '@core/environment';

export function redisCacheOptions(): unknown {
	return {
		isGlobal: true,
		store: async () =>
			await redisStore({
				socket: {
					host: cacheConfig.host,
					port: cacheConfig.port,
					tls: cacheConfig.tls
				},
				password: cacheConfig.password,
				username: cacheConfig.username,
				ttl: cacheConfig.ttl
			})
	};
}
