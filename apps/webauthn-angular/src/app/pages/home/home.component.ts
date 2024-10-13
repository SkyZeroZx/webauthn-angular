import { ReplaySubject, shareReplay, switchMap } from 'rxjs';

import { AuthService } from '@/services/auth';
import { WebAuthnService } from '@/services/web-authn';
import { JsonPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatDialog } from '@angular/material/dialog';

import { AuthenticatorComponent, AuthOptionsComponent, RegisterComponent } from './components';

@Component({
	selector: 'app-home',
	standalone: true,
	imports: [JsonPipe, AuthenticatorComponent, RegisterComponent, AuthOptionsComponent],
	templateUrl: './home.component.html',
	styleUrl: './home.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent implements OnInit {
	private readonly authService = inject(AuthService);
	private readonly webAuthnService = inject(WebAuthnService);
	private readonly dialogService = inject(MatDialog);

	readonly user = this.authService.user;
	private readonly refreshSubject = new ReplaySubject<void>(1);

	authenticators = this.getAuthenticators();

	ngOnInit(): void {
		if (!this.user()) {
			return this.showRegister();
		}
		this.refreshSubject.next();
	}

	getAuthenticators() {
		const authenticators$ = this.webAuthnService.getAuthenticators();
		const refreshAuthenticators$ = this.refreshSubject.asObservable().pipe(
			switchMap(() => authenticators$),
			shareReplay(1)
		);

		return toSignal(refreshAuthenticators$, {
			initialValue: []
		});
	}

	onRefreshAuthenticators() {
		this.refreshSubject.next();
	}

	showRegister() {
		const dialogRef = this.dialogService.open(RegisterComponent, {
			panelClass: 'register-dialog-container',
			disableClose: true
		});

		dialogRef.componentRef.instance.onClose.subscribe(() => {
			dialogRef.close();
			this.refreshSubject.next();
		});
	}
}
