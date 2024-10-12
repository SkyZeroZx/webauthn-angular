import { from, map, switchMap, tap } from 'rxjs';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
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

	private readonly authenticationResponseJSON = signal<AuthenticationResponseJSON>(null);

	get payload() {
		return this.authenticationResponseJSON.asReadonly();
	}

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
		let headers = new HttpHeaders();
		headers = headers.set('x-username', localStorage.getItem('username'));
		return this.http
			.get<
				ResponseFormat<PublicKeyCredentialRequestOptionsJSON>
			>(`${environment.API_URL}/auth/generate-authentication-options`, { headers })
			.pipe(map(({ data }) => data));
	}

	private startAuthentication(optionsJSON: PublicKeyCredentialRequestOptionsJSON) {
		return from(startAuthentication(optionsJSON));
	}

	private verifyAuthentication(response: AuthenticationResponseJSON) {
		let headers = new HttpHeaders();
		headers = headers.set('x-username', localStorage.getItem('username'));
		this.authenticationResponseJSON.set(response);
		return this.http.post<ResponseFormat<{ userAuthenticated: UserAuthenticated; data: unknown }>>(
			`${environment.API_URL}/auth/verify-authentication`,
			response,
			{ headers }
		);
	}

	login() {
		return this.generateAuthenticationOptions()
			.pipe(
				switchMap((options) => this.startAuthentication(options)),
				switchMap((res) => this.verifyAuthentication(res))
			)
			.pipe(tap(({ data }) => this.authService.saveUserStorage(data.userAuthenticated)));
	}

	getAuthenticators() {
		return this.http
			.get<ResponseFormat<Authentication[]>>(`${environment.API_URL}/auth/authenticators`)
			.pipe(map(({ data }) => data));
	}

	isAvailable() {
		return from(PublicKeyCredential.isUserVerifyingPlatformAuthenticatorAvailable());
	}
}
