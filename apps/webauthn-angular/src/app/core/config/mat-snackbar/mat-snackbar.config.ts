import { MAT_SNACK_BAR_DEFAULT_OPTIONS, MatSnackBarConfig } from '@angular/material/snack-bar';

 const matSnackBarConfigCustom: MatSnackBarConfig = {
	duration: 2000,
	horizontalPosition: 'center',
	verticalPosition: 'bottom'
};
export const MAT_SNACK_BAR_CONFIG = {
	useValue: matSnackBarConfigCustom,
	provide: MAT_SNACK_BAR_DEFAULT_OPTIONS
};