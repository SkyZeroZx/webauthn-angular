import { Repository } from 'typeorm';

import { BadRequestException, Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { VerifiedRegistrationResponse } from '@simplewebauthn/server';
import { AuthenticationResponseJSON, RegistrationResponseJSON } from '@simplewebauthn/types';

import { ChallengeService } from './challenge.service';
import { AuthenticationEntity } from './entities/authentication.entity';
import { WebAuthnService } from './web-authn.service';
import { User } from '@skyzerozx/shared-interfaces';

@Injectable()
export class AuthService {
	private readonly logger = new Logger(AuthService.name);
	constructor(
		@InjectRepository(AuthenticationEntity)
		private readonly authenticationRepository: Repository<AuthenticationEntity>,
		private readonly jwtService: JwtService,
		private readonly challengeService: ChallengeService,
		private readonly webAuthnService: WebAuthnService
	) {}

	async generateRegistrationOptions(username: string) {
		this.logger.log({ message: 'generate registration options', data: username });

		const userAuthenticators = await this.findAuthenticatorsByUsername(username);

		const register = await this.webAuthnService.generateRegisterOptions(
			username,
			userAuthenticators
		);

		await this.challengeService.save(username, register.challenge);

		return register;
	}

	async verifyRegistration(verify: RegistrationResponseJSON, user: User) {
		this.logger.log({ message: 'verify registration', data: { user, verify } });

		const challenge = await this.challengeService.findByUsername(user.username);

		const verifyAuthentication = await this.webAuthnService.verifyRegistrationResponse(
			challenge,
			verify
		);

		if (!verifyAuthentication.verified) {
			throw new BadRequestException('Registration verification failed');
		}

		await this.saveAuthenticator(user, verify.id, verifyAuthentication);
	}

	saveAuthenticator(
		user: User,
		authenticatorId: string,
		{ registrationInfo }: VerifiedRegistrationResponse
	) {
		return this.authenticationRepository.save({
			id: authenticatorId,
			counter: registrationInfo.counter,
			user: user,
			credentialID: registrationInfo.credentialID,
			credentialPublicKey: Buffer.from(registrationInfo.credentialPublicKey)
		});
	}

	generateToken(user: User) {
		const token = this.jwtService.sign({ user });
		return { token };
	}

	findAuthenticatorsByUsername(username: string) {
		return this.authenticationRepository.find({
			where: {
				user: {
					username
				}
			}
		});
	}

	async generateAuthenticationOptions(username: string) {
		const credentials = await this.findAuthenticatorsByUsername(username);

		const options = await this.webAuthnService.generateAuthenticationOptions(credentials);

		await this.challengeService.save(username, options.challenge);

		return options;
	}

	async verifyAuthentication(user: User, data: AuthenticationResponseJSON) {
		const [authenticator, challenge] = await Promise.all([
			this.findAuthenticatorById(data.id, user.username),
			this.challengeService.findByUsername(user.username)
		]);

		const { verified, authenticationInfo } =
			await this.webAuthnService.verifyAuthenticationResponse(authenticator, challenge, data);

		if (!verified) {
			this.logger.warn({
				message: 'Authentication failed for user',
				data: { authenticationInfo, user }
			});
			throw new UnauthorizedException('Authentication failed');
		}

		return this.generateToken(user);
	}

	async findAuthenticatorById(id: string, username: string) {
		return this.authenticationRepository.findOne({
			where: {
				id,
				user: {
					username
				}
			}
		});
	}
}
