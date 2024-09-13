import { jwtConfig } from '@core/environment';
import { JwtModuleAsyncOptions } from '@nestjs/jwt';

export function jwtModuleAsyncOptions(): JwtModuleAsyncOptions {
	return {
		global: true,
		useFactory: () => {
			return {
				secret: jwtConfig.secretToken,
				signOptions: {
					expiresIn: jwtConfig.expireTime
				}
			};
		}
	};
}
