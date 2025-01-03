import { MAT_FORM_FIELD_CUSTOM } from '@/core/config';
import { STORAGE_KEYS } from '@/core/constants';
import { TypedFormControls } from '@/core/interface';
import { AuthService } from '@/services/auth';
import { WebAuthnService } from '@/services/web-authn';
import { ChangeDetectionStrategy, Component, inject, output } from '@angular/core';
import {
	FormBuilder,
	FormGroup,
	FormsModule,
	ReactiveFormsModule,
	Validators
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoginUser } from '@skyzerozx/shared-interfaces';

@Component({
	selector: 'app-login',
	standalone: true,
	imports: [
		FormsModule,
		ReactiveFormsModule,
		MatFormFieldModule,
		MatDialogModule,
		MatButtonModule,
		MatInputModule,
		MatIconModule
	],
	templateUrl: './login.component.html',
	styleUrl: './login.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [MAT_FORM_FIELD_CUSTOM]
})
export class LoginComponent {
	private readonly authService = inject(AuthService);
	private readonly snackBar = inject(MatSnackBar);
	private readonly formBuilder = inject(FormBuilder);
	private readonly webAuthnService = inject(WebAuthnService);

	readonly hasUserNameStored = localStorage.getItem(STORAGE_KEYS.USERNAME);

	readonly isLoading = this.authService.isLoading;

	onLogin = output<void>();
	onGoBack = output<void>();

	loginForm: FormGroup<TypedFormControls<LoginUser>> = this.formBuilder.group({
		username: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(255)]],
		password: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(128)]]
	});

	goBack() {
		this.onGoBack.emit();
		this.loginForm.reset();
	}

	loginWithWebAuthn() {
		this.webAuthnService.login().subscribe({
			next: () => {
				this.snackBar.open('User login with WebAuthn', 'OK');
				this.onLogin.emit();
			}
		});
	}

	login() {
		const { username, password } = this.loginForm.getRawValue();
		this.authService.login(username, password).subscribe({
			next: () => {
				this.snackBar.open('User login with credentials', 'OK');
				this.onLogin.emit();
			}
		});
	}
}
