import { ErrorHandler } from '@angular/core';
import { GlobalErrorHandler } from './global-error-handler.service';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';

export const GLOBAL_ERROR_HANDLER = {
	provide: ErrorHandler,
	useClass: GlobalErrorHandler,
	deps: [MatDialog, MatDialogModule]
};