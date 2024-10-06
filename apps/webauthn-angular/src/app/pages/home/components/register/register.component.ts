import { ChangeDetectionStrategy, Component, inject, output } from '@angular/core';
import {
	FormBuilder,
	FormGroup,
	FormsModule,
	ReactiveFormsModule,
	Validators
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS, MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { RegisterUser } from '@skyzerozx/shared-interfaces';

import { TypedFormControls } from '../../../../core/interface/forms/forms.interface';
import { AuthService } from '../../../../services/auth';

@Component({
	selector: 'app-register',
	standalone: true,
	imports: [
		FormsModule,
		ReactiveFormsModule,
		MatFormFieldModule,
		MatButtonModule,
		MatInputModule,
		MatSnackBarModule
	],
	templateUrl: './register.component.html',
	styleUrl: './register.component.scss',
	providers: [{ provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { appearance: 'outline' } }],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class RegisterComponent {
	private readonly authService = inject(AuthService);
	private readonly snackBar = inject(MatSnackBar);
	private readonly formBuilder = inject(FormBuilder);

	onRegister = output<void>();

	registerForm: FormGroup<TypedFormControls<RegisterUser>> = this.formBuilder.group({
		username: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(255)]],
		password: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(128)]],
		name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(80)]],
		lastName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(255)]]
	});

	register() {
		this.authService.register(this.registerForm.getRawValue()).subscribe({
			next: () => {
				this.snackBar.open('User Registration Success', 'OK');
				this.onRegister.emit();
			}
		});
	}
}
