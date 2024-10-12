import { concatMap, tap } from 'rxjs';
import { jwtDecode } from 'jwt-decode';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import {
	DecodeToken,
	RegisterUser,
	ResponseFormat,
	UserAuthenticated,
	UserProfile
} from '@skyzerozx/shared-interfaces';

import { environment } from '../../../environments/environment';
import { STORAGE_KEYS } from '../../core/constants';

@Injectable({
	providedIn: 'root'
})
export class AuthService {
	private readonly http = inject(HttpClient);
	private readonly userStorage = signal<UserProfile>(this.decodeToken());

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

	saveUserStorage({ token, user }: UserAuthenticated) {
		localStorage.setItem(STORAGE_KEYS.TOKEN, token);
		localStorage.setItem(STORAGE_KEYS.USERNAME, user.username);
		this.userStorage.set(user);
	}

	get user() {
		return this.userStorage.asReadonly();
	}

	getTokenStore() {
		return localStorage.getItem('token');
	}

	private decodeToken(): DecodeToken {
		const token = this.getTokenStore();
		if (!token) {
			return null;
		}

		return jwtDecode(token);
	}

	logout() {
		localStorage.removeItem(STORAGE_KEYS.TOKEN);
		this.userStorage.set(null);
	}
}
