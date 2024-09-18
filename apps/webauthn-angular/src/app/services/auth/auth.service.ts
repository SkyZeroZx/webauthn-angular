import { concatMap, tap } from 'rxjs';

import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import {
	RegisterUser,
	ResponseFormat,
	UserAuthenticated,
	UserProfile
} from '@skyzerozx/shared-interfaces';

import { environment } from '../../../environments/environment';

@Injectable({
	providedIn: 'root'
})
export class AuthService {
	private readonly http = inject(HttpClient);
	private readonly userStorage = signal<UserProfile>(null);

	register(registerUser: RegisterUser) {
		return this.http
			.post<ResponseFormat<UserProfile>>(`${environment.API_URL}/users/register`, registerUser)
			.pipe(concatMap(() => this.login(registerUser.username, registerUser.password)));
	}

	login(username: string, password: string) {
		return this.http
			.post<
				ResponseFormat<UserAuthenticated>
			>(`${environment.API_URL}/auth/login`, { username, password })
			.pipe(tap(({ data }) => this.saveUserStorage(data)));
	}

	private saveUserStorage({ token, user }: UserAuthenticated) {
		localStorage.setItem('token', token);
		this.userStorage.set(user);
	}

	get user() {
		return this.userStorage.asReadonly();
	}

	getTokenStore() {
		return localStorage.getItem('token');
	}
}
