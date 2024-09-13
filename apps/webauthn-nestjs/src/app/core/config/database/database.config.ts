import { TypeOrmModuleAsyncOptions, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { databaseConfig } from '@core/environment';

function typeOrmConfig(): TypeOrmModuleOptions {
	return {
		type: 'postgres',
		...databaseConfig,
 	};
}

export function typeOrmAsyncOptions(): TypeOrmModuleAsyncOptions {
	return {
		useFactory: () => typeOrmConfig()
	};
}
