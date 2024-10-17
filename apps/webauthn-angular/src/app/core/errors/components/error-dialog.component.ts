import { ChangeDetectionStrategy, Component, CUSTOM_ELEMENTS_SCHEMA, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';

import { ErrorMessage } from '@/core/interface';

@Component({
	selector: 'app-error-dialog',
	standalone: true,
	imports: [MatButtonModule, MatIconModule],
	templateUrl: './error-dialog.component.html',
	styleUrl: './error-dialog.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
	schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ErrorDialogComponent {
	data = inject<ErrorMessage>(MAT_DIALOG_DATA);
	dialogRef = inject(MatDialogRef<ErrorDialogComponent>);

	close() {
		this.dialogRef.close();
	}
}
