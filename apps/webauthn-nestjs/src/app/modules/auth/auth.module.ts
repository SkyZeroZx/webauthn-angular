import { UserModule } from '@/user';
import { JwtModule } from '@core/config';
import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { ChallengeService } from './challenge.service';
import { AuthenticationEntity } from './entities/authentication.entity';
import {
	JwtStrategy,
	LocalStrategy
} from './strategies';
import { WebAuthnService } from './web-authn.service';

@Module({
	controllers: [AuthController],
	imports: [
		TypeOrmModule.forFeature([AuthenticationEntity]),
		JwtModule,
		UserModule,
		PassportModule
	],
	providers: [
		AuthService,
		LocalStrategy,
		JwtStrategy,
		ChallengeService,
		WebAuthnService
	],
	exports: [AuthService]
})
export class AuthModule {}
