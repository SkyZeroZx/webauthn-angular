import { Module } from '@nestjs/common';

import { JwtModule as JWTModuleNestJS } from '@nestjs/jwt';
import { jwtModuleAsyncOptions } from './jwt.config';

@Module({
	imports: [JWTModuleNestJS.registerAsync(jwtModuleAsyncOptions())],
	exports : [JWTModuleNestJS]
})
export class JwtModule {}
