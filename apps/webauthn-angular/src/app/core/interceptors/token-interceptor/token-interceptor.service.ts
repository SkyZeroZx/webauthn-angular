import { AuthService } from '@/services/auth';
import { HttpHandlerFn, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';

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
