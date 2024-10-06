import { shareReplay } from 'rxjs';

import { JsonPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';

import { AuthService } from '../../services/auth';
import { WebAuthnService } from '../../services/web-authn';
import { AuthOptionsComponent } from './components/auth-options/auth-options.component';
import { AuthenticatorComponent } from './components/authenticator/authenticator.component';
import { RegisterComponent } from './components/register/register.component';

@Component({
	selector: 'app-home',
	standalone: true,
	imports: [
		JsonPipe,
		AuthenticatorComponent,
		RegisterComponent,
		AuthOptionsComponent,
		MatDialogModule
	],
	templateUrl: './home.component.html',
	styleUrl: './home.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent implements OnInit {
	private readonly authService = inject(AuthService);
	private readonly webAuthnService = inject(WebAuthnService);
	private readonly dialogService = inject(MatDialog);

	readonly user = this.authService.user;

	authenticators = toSignal(this.webAuthnService.getAuthenticators().pipe(shareReplay(1)), {
		initialValue: []
	}); //TODO: Add refresh when register a new authenticator

	ngOnInit(): void {
		if (!this.user()) {
			this.showRegister();
		}
	}

	showRegister() {
		const dialogRef = this.dialogService.open(RegisterComponent, {
			panelClass: 'register-dialog-container',
			disableClose: true
		});

		dialogRef.componentRef.instance.onRegister.subscribe(() => dialogRef.close());
	}
}
