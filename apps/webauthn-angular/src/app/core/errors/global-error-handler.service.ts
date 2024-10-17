import { PREVIOUS_REGISTER_AUTHENTICATOR } from '@/core/constants';
import { ErrorMapper } from '@/core/interface';
import { ErrorHandler, inject, Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { ErrorDialogComponent } from './components/error-dialog.component';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
	private readonly matDialog = inject(MatDialog);

	private readonly errorMappings: ErrorMapper[] = [
		{
			title: 'Previous registration',
			toCompare: PREVIOUS_REGISTER_AUTHENTICATOR,
			icon: 'error',
			message: 'Already registered authentication'
		}
	];

	handleError(error: unknown) {
		console.error(GlobalErrorHandler.name, error);

		const message = this.getMessage(error);

		const matchedError = this.errorMappings.find((mapping) =>
			message.includes(mapping.toCompare.toLowerCase())
		);

		if (matchedError) {
			console.log(`Handling error: ${matchedError.title}`);

			this.matDialog.open(ErrorDialogComponent, {
				data: matchedError,
				height: '400px',
				width: '600px'
			});
		}
	}

	getMessage(error: unknown) {
		const message = error?.['message'];

		if (!message) {
			return null;
		}

		return message?.toLowerCase() as string;
	}
}
