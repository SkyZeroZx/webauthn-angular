import {
	HttpInterceptorFn,
	HttpRequest,
	HttpHandlerFn,
	HttpErrorResponse
} from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

export const DEFAULT_ERROR = 'Error unknown';

export const errorInterceptor: HttpInterceptorFn = (
	request: HttpRequest<unknown>,
	next: HttpHandlerFn
) => {
	const snackBar = inject(MatSnackBar);

	return next(request).pipe(
		catchError((returnedError) => {
			let errorMessage = '';

			if (returnedError.error instanceof ErrorEvent) {
				errorMessage = `Error: ${returnedError.error}`;
			}

			if (returnedError instanceof HttpErrorResponse) {
				errorMessage = `Error Status ${returnedError.status}: ${returnedError.statusText} - ${returnedError.error}`;
			}

			console.error(errorMessage ? errorMessage : returnedError);

			if (returnedError?.error?.title || returnedError?.error?.type) {
				snackBar.open(DEFAULT_ERROR);
			} else {
				snackBar.open(`${returnedError?.error?.message || returnedError?.error || DEFAULT_ERROR}`);
			}

			return throwError(() => new Error(errorMessage || DEFAULT_ERROR));
		})
	);
};
