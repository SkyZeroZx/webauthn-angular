import { Module } from '@nestjs/common';
import { CacheModule } from '@nestjs/cache-manager';
import { redisCacheOptions } from './cache.config';

@Module({
	imports: [CacheModule.register<unknown>(redisCacheOptions())]
})
export class CacheConfigModule {}
