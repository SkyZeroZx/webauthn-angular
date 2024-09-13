import { HttpInterceptorFn, HttpRequest, HttpHandlerFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../../../services/auth';

export const tokenInterceptor: HttpInterceptorFn = (
	request: HttpRequest<unknown>,
	next: HttpHandlerFn
) => {
	const authService = inject(AuthService);
	const isLoginURL = request.url.includes('auth/login');
	if (!isLoginURL) {
		const token = authService.getTokenStore();
		if (token) {
			request = request.clone({
				setHeaders: {
					Authorization: `Bearer ${token}`
				}
			});
		}
	}
	return next(request);
};
