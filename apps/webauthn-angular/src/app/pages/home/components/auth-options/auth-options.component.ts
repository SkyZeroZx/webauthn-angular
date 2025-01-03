import { tap } from 'rxjs';

import { AuthService } from '@/services/auth';
import { WebAuthnService } from '@/services/web-authn';
import { JsonViewerComponent } from '@/shared';
import { ChangeDetectionStrategy, Component, inject, output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
	selector: 'app-auth-options',
	standalone: true,
	imports: [MatButtonModule, MatIconModule, JsonViewerComponent],
	templateUrl: './auth-options.component.html',
	styleUrl: './auth-options.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class AuthOptionsComponent {
	private readonly webAuthnService = inject(WebAuthnService);
	private readonly snackBar = inject(MatSnackBar);
	private readonly matDialog = inject(MatDialog);
	private readonly authService = inject(AuthService);
	user = this.authService.user
	onRegisterAuthenticator = output<void>();

	registerWebAuthn() {
		this.webAuthnService
			.register()
			.pipe(tap(() => this.onRegisterAuthenticator.emit()))
			.subscribe(() => {
				this.snackBar.open('Authentication has been registered');
			});
	}

	loginWebAuthn() {
		this.webAuthnService
			.login()
			.pipe(tap(() => this.snackPayloadMessage()))
			.subscribe(console.log);
	}

	snackPayloadMessage() {
		const payload = this.webAuthnService.payload();
		const { response } = payload;
		this.snackBar
			.open('Show Payload Message', 'Show Payload')
			.onAction()
			.subscribe(() => {
				this.matDialog.open(JsonViewerComponent, {
					panelClass: 'json-viewer-dialog-container',
					data: {
						json: {
							...payload,
							response: {
								...response,
								clientDataJSON: JSON.parse(atob(response.clientDataJSON))
							}
						},
						title: 'Payload'
					}
				});
			});
	}

	isAvariableWebAuthn() {
		this.webAuthnService.isAvailable().subscribe({
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
