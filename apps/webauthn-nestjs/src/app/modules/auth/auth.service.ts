import { Repository } from 'typeorm';

import { BadRequestException, Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { VerifiedRegistrationResponse } from '@simplewebauthn/server';
import { AuthenticationResponseJSON, RegistrationResponseJSON } from '@simplewebauthn/types';
import { User, UserAuthenticated } from '@skyzerozx/shared-interfaces';

import { UserService } from '../user';
import { ChallengeService } from './challenge.service';
import { AuthenticationEntity } from './entities/authentication.entity';
import { WebAuthnService } from './web-authn.service';

@Injectable()
export class AuthService {
	private readonly logger = new Logger(AuthService.name);
	constructor(
		@InjectRepository(AuthenticationEntity)
		private readonly authenticationRepository: Repository<AuthenticationEntity>,
		private readonly jwtService: JwtService,
		private readonly challengeService: ChallengeService,
		private readonly webAuthnService: WebAuthnService,
		private readonly userService: UserService
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

	async verifyRegistration(verify: RegistrationResponseJSON, user: User, device: string) {
		this.logger.log({ message: 'verify registration', data: { user, verify, device } });

		const challenge = await this.challengeService.findByUsername(user.username);

		const verifyAuthentication = await this.webAuthnService.verifyRegistrationResponse(
			challenge,
			verify
		);

		this.logger.log({ message: 'Register Authentication options', data: { verifyAuthentication } });

		if (!verifyAuthentication.verified) {
			throw new BadRequestException('Registration verification failed');
		}

		await this.saveAuthenticator(user, verify.id, verifyAuthentication, device);
	}

	saveAuthenticator(
		user: User,
		authenticatorId: string,
		{ registrationInfo }: VerifiedRegistrationResponse,
		device: string
	) {
		return this.authenticationRepository.save({
			id: authenticatorId,
			device,
			counter: registrationInfo.counter,
			user: user,
			credentialID: registrationInfo.credentialID,
			credentialPublicKey: Buffer.from(registrationInfo.credentialPublicKey),
			credentialDeviceType: registrationInfo.credentialDeviceType,
			aaguid: registrationInfo.aaguid
		});
	}

	generateToken(user: User): UserAuthenticated {
		delete user.password;
		const token = this.jwtService.sign({ ...user });
		return { token, user };
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

	async verifyAuthentication(username: string, data: AuthenticationResponseJSON) {
		const [authenticator, challenge, user] = await Promise.all([
			this.findAuthenticatorByIdwithUserName(data.id, username),
			this.challengeService.findByUsername(username),
			this.userService.findByUsername(username)
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

		const userAuthenticated = this.generateToken(user);
		return { userAuthenticated, authenticationInfo, verified };
	}

	async findAuthenticatorByIdwithUserName(id: string, username: string) {
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
