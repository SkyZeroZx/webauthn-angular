import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegisterUser } from '@skyzerozx/shared-interfaces';

import { TypedFormControls } from '../../core/interface/forms/forms.interface';
import { AuthService } from '../../services/auth';
import { WebAuthnService } from '../../services/web-authn';
import { JsonPipe } from '@angular/common';

@Component({
	selector: 'app-landing',
	standalone: true,
	imports: [FormsModule, ReactiveFormsModule, JsonPipe],
	templateUrl: './landing.component.html',
	styleUrl: './landing.component.scss'
})
export class LandingComponent {
	private readonly webAuthnService = inject(WebAuthnService);
	private readonly authService = inject(AuthService);
	private readonly formBuilder = inject(FormBuilder);
	user = this.authService.user;

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
