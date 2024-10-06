import { from } from 'rxjs';

import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

import { AuthService } from '../../../../services/auth';
import { WebAuthnService } from '../../../../services/web-authn';

@Component({
	selector: 'app-auth-options',
	standalone: true,
	imports: [MatButtonModule, MatIconModule, MatSnackBarModule],
	templateUrl: './auth-options.component.html',
	styleUrl: './auth-options.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class AuthOptionsComponent {
	private readonly webAuthnService = inject(WebAuthnService);
	private readonly authService = inject(AuthService);
	private readonly snackBar = inject(MatSnackBar);
	user = this.authService.user;

	registerWebAuthn() {
		this.webAuthnService.register().subscribe(console.log);
	}

	loginWebAuthn() {
		this.webAuthnService.login().subscribe(console.log);
	}

	isAvariableWebAuthn() {
		from(PublicKeyCredential.isUserVerifyingPlatformAuthenticatorAvailable()).subscribe({
			next: (available) => {
				if (available) {
					this.snackBar.open('WebAuthn is available!', 'OK');
				} else {
					this.snackBar.open('WebAuthn is not available!', 'OK');
				}
			}
		});
	}
}
