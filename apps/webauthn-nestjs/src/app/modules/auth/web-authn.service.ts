import { Injectable } from '@nestjs/common';
import {
	generateAuthenticationOptions,
	generateRegistrationOptions,
	verifyAuthenticationResponse,
	verifyRegistrationResponse
} from '@simplewebauthn/server';
import { AuthenticationResponseJSON, RegistrationResponseJSON } from '@simplewebauthn/types';

import { webAuthnConfig } from '@core/environment';
import { AuthenticationEntity } from './entities/authentication.entity';

@Injectable()
export class WebAuthnService {
	generateRegisterOptions(username: string, authenticators: AuthenticationEntity[]) {
		return generateRegistrationOptions({
			rpName: webAuthnConfig.rpName,
			rpID: webAuthnConfig.rpId,
			userName: username,
			attestationType: 'direct',
			authenticatorSelection: {
				userVerification: 'preferred',
				authenticatorAttachment: 'platform'
			},
			extensions: {
				credProps: true
			},
			excludeCredentials: authenticators.map((item) => ({
				id: item.id,
				transports: ['internal']
			}))
		});
	}

	verifyRegistrationResponse(challenge: string, response: RegistrationResponseJSON) {
		return verifyRegistrationResponse({
			expectedChallenge: challenge,
			response,
			expectedOrigin: webAuthnConfig.origin,
			expectedRPID: webAuthnConfig.rpIdArray
		});
	}

	generateAuthenticationOptions(authenticators: AuthenticationEntity[]) {
		return generateAuthenticationOptions({
			rpID: webAuthnConfig.rpId,
			allowCredentials: authenticators.map((item) => ({
				id: item.id
			}))
		});
	}

	verifyAuthenticationResponse(
		authenticator: AuthenticationEntity,
		challenge: string,
		data: AuthenticationResponseJSON
	) {
		return verifyAuthenticationResponse({
			response: data,
			expectedChallenge: challenge,
			expectedOrigin: webAuthnConfig.origin,
			expectedRPID: webAuthnConfig.rpIdArray,
			authenticator: {
				credentialID: authenticator.id,
				credentialPublicKey: authenticator.credentialPublicKey,
				counter: authenticator.counter
			}
		});
	}
}
