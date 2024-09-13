import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';

@Injectable()
export class ChallengeService {
	constructor(
		@Inject(CACHE_MANAGER)
		private readonly cacheManager: Cache
	) {}

	private async set(key: string, value: unknown) {
		this.cacheManager.set(key, value);
	}

	private get<T = unknown>(key: string): Promise<T> {
		return this.cacheManager.get(key);
	}

	async save(username: string, challenge: string) {
		this.set(username, challenge);
	}

	async findByUsername(username: string) {
		return this.get<string>(username);
	}
}
