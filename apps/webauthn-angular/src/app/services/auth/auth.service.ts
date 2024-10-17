import { jwtDecode } from 'jwt-decode';
import { concatMap, finalize, tap } from 'rxjs';

import { REFRESH_RESET, STORAGE_KEYS } from '@/core/constants';
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
import { RefreshService } from '../refresh';

@Injectable({
	providedIn: 'root'
})
export class AuthService {
	private readonly http = inject(HttpClient);
	private readonly userStorage = signal<UserProfile>(this.decodeToken());
	private readonly _isLoading = signal(false);
	private readonly refreshService = inject(RefreshService);

	get isLoading() {
		return this._isLoading.asReadonly();
	}

	register(registerUser: RegisterUser) {
		this._isLoading.set(false);
		return this.http
			.post<ResponseFormat<UserProfile>>(`${environment.API_URL}/users/register`, registerUser)
			.pipe(
				tap(() => this._isLoading.set(true)),
				concatMap(() => this.login(registerUser.username, registerUser.password)),
				finalize(() => this._isLoading.set(false))
			);
	}

	login(username: string, password: string) {
		this._isLoading.set(false);

		return this.http
			.post<
				ResponseFormat<UserAuthenticated>
			>(`${environment.API_URL}/auth/login`, { username, password })
			.pipe(
				tap(() => this._isLoading.set(true)),
				tap(({ data }) => this.saveUserStorage(data)),
				finalize(() => this._isLoading.set(false))
			);
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
		return localStorage.getItem(STORAGE_KEYS.TOKEN);
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
		this.refreshService.refresh(REFRESH_RESET);
	}
}
