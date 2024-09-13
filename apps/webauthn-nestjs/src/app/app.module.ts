import { AuthModule, UserModule } from '@/index';
import { CacheConfigModule, DatabaseConfigModule } from '@core/config';
import { AllExceptionFilter } from '@core/filters';
import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';

import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
	imports: [CacheConfigModule, DatabaseConfigModule, UserModule, AuthModule],
	controllers: [AppController],
	providers: [
		AppService,
		{
			provide: APP_FILTER,
			useClass: AllExceptionFilter
		}
	]
})
export class AppModule {}
