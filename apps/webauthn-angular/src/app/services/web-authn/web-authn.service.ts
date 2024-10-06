import { from, map, switchMap, tap } from 'rxjs';

import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { startAuthentication, startRegistration } from '@simplewebauthn/browser';
import {
	AuthenticationResponseJSON,
	PublicKeyCredentialCreationOptionsJSON,
	PublicKeyCredentialRequestOptionsJSON,
	RegistrationResponseJSON
} from '@simplewebauthn/types';
import { Authentication, ResponseFormat, UserAuthenticated } from '@skyzerozx/shared-interfaces';

import { environment } from '../../../environments/environment';
import { AuthService } from '../auth';

@Injectable({
	providedIn: 'root'
})
export class WebAuthnService {
	private readonly http = inject(HttpClient);
	private readonly authService = inject(AuthService);

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
			switchMap((options) => this.startRegistration(options)),
			switchMap((res) => this.verifyRegistration(res))
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
		return this.http.post<ResponseFormat<UserAuthenticated>>(
			`${environment.API_URL}/auth/verify-authentication`,
			response
		);
	}

	login() {
		return this.generateAuthenticationOptions()
			.pipe(
				switchMap((options) => this.startAuthentication(options)),
				switchMap((res) => this.verifyAuthentication(res))
			)
			.pipe(tap(({ data }) => this.authService.saveUserStorage(data)));
	}

	getAuthenticators() {
		return this.http
			.get<ResponseFormat<Authentication[]>>(`${environment.API_URL}/auth/authenticators`)
			.pipe(map(({ data }) => data));
	}
}
