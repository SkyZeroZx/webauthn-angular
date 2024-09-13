import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthService } from './services/auth/auth.service';
import { WebAuthnService } from './services/web-authn';
import { ReactiveFormsModule, FormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { TypedFormControls } from './core/interface/forms/forms.interface';
import { RegisterUser } from '@skyzerozx/shared-interfaces';

@Component({
	standalone: true,
	imports: [RouterModule, ReactiveFormsModule, FormsModule],
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrl: './app.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
	private readonly webAuthnService = inject(WebAuthnService);
	private readonly authService = inject(AuthService);
	private readonly formBuilder = inject(FormBuilder);

	registerForm: FormGroup<TypedFormControls<RegisterUser>> = this.formBuilder.group({
		username: [''],
		password: [''],
		name: [''],
		lastName: ['']
	});

	registerWebAuthn() {
		this.webAuthnService.register().subscribe(console.log);
	}

	loginWebAuthn() {
		this.webAuthnService.login().subscribe(console.log);
	}

	register() {
		this.authService.register(this.registerForm.getRawValue()).subscribe(console.log);
	}
}
