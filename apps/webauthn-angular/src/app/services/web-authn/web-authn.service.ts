import { from, map, switchMap } from 'rxjs';

import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { startAuthentication, startRegistration } from '@simplewebauthn/browser';
import {
    AuthenticationResponseJSON, PublicKeyCredentialCreationOptionsJSON,
    PublicKeyCredentialRequestOptionsJSON, RegistrationResponseJSON
} from '@simplewebauthn/types';
import { ResponseFormat } from '@skyzerozx/shared-interfaces';

import { environment } from '../../../environments/environment';

@Injectable({
	providedIn: 'root'
})
export class WebAuthnService {
	private readonly http = inject(HttpClient);

	private generateRegistrationOptions() {
		return this.http
			.get<
				ResponseFormat<PublicKeyCredentialCreationOptionsJSON>
			>(`${environment.API_URL}/auth/generate-registration-options`)
			.pipe(map(({ data }) => data));
	}

	private startRegistration(publicKey: PublicKeyCredentialCreationOptionsJSON) {
		return from(startRegistration(publicKey));
	}

	private verifyRegistration(registration: RegistrationResponseJSON) {
		return this.http.post<ResponseFormat<void>>(
			`${environment.API_URL}/auth/verify-registration`,
			registration
		);
	}

	register() {
		return this.generateRegistrationOptions().pipe(
			switchMap(this.startRegistration),
			switchMap(this.verifyRegistration)
		);
	}

	private generateAuthenticationOptions() {
		return this.http
			.get<
				ResponseFormat<PublicKeyCredentialRequestOptionsJSON>
			>(`${environment.API_URL}/auth/generate-authentication-options`)
			.pipe(map(({ data }) => data));
	}

	private startAuthentication(optionsJSON: PublicKeyCredentialRequestOptionsJSON) {
		return from(startAuthentication(optionsJSON));
	}

	private verifyAuthentication(response: AuthenticationResponseJSON) {
		return this.http.post<ResponseFormat>(`${environment.API_URL}/auth/verify-authentication`, response);
	}

	login() {
		return this.generateAuthenticationOptions().pipe(
			switchMap(this.startAuthentication),
			switchMap(this.verifyAuthentication)
		);
	}
}
