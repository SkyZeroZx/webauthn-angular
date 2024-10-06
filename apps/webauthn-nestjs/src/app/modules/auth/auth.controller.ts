 
import { UserAgent } from '@core/decorators';
import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthenticationResponseJSON, RegistrationResponseJSON } from '@simplewebauthn/types';
import { User } from '@skyzerozx/shared-interfaces';

import { AuthService } from './auth.service';
import { Auth, GetUserContext, LoginAuth } from './decorators';

@Controller('auth')
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@Auth()
	@Get('generate-registration-options')
	generateOptions(@GetUserContext() user: User) {
		return this.authService.generateRegistrationOptions(user.username);
	}

	@Auth()
	@Post('verify-registration')
	verifyRegistration(
		@Body() verify: RegistrationResponseJSON,
		@GetUserContext() user: User,
		@UserAgent() device: string
	) {
		return this.authService.verifyRegistration(verify, user, device);
	}

	@Auth()
	@Get('generate-authentication-options')
	generateAuthOptions(@GetUserContext() user: User) {
		return this.authService.generateAuthenticationOptions(user.username);
	}

	@Post('verify-authentication')
	verifyAuth(@GetUserContext() user: User, @Body() data: AuthenticationResponseJSON) {
		return this.authService.verifyAuthentication(user, data);
	}

	@LoginAuth()
	@Post('login')
	login(@GetUserContext() user: User) {
		return this.authService.generateToken(user);
	}

	@Auth()
	@Get('authenticators')
	getAuthenticators(@GetUserContext() user: User) {
		return this.authService.findAuthenticatorsByUsername(user.username);
	}
}
