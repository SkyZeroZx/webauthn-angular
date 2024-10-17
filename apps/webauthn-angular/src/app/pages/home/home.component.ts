import { of, shareReplay, switchMap } from 'rxjs';

import { REFRESH_RESET } from '@/core/constants';
import { AuthService } from '@/services/auth';
import { RefreshService } from '@/services/refresh';
import { WebAuthnService } from '@/services/web-authn';
import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatDialog } from '@angular/material/dialog';

import { AuthenticatorComponent, AuthOptionsComponent, RegisterComponent } from './components';

@Component({
	selector: 'app-home',
	standalone: true,
	imports: [AuthenticatorComponent, RegisterComponent, AuthOptionsComponent],
	templateUrl: './home.component.html',
	styleUrl: './home.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent implements OnInit {
	private readonly authService = inject(AuthService);
	private readonly webAuthnService = inject(WebAuthnService);
	private readonly dialogService = inject(MatDialog);
	private readonly refreshService = inject(RefreshService);
	readonly user = this.authService.user;

	authenticators = this.getAuthenticators();

	ngOnInit(): void {
		if (!this.user()) {
			return this.showRegister();
		}

		this.refreshService.refresh();
	}

	getAuthenticators() {
		const authenticators$ = this.webAuthnService.getAuthenticators();
		const refreshAuthenticators$ = this.refreshService.refresh$.pipe(
			switchMap((value) => (value === REFRESH_RESET ? of([]) : authenticators$)),
			shareReplay(1)
		);

		return toSignal(refreshAuthenticators$, {
			initialValue: []
		});
	}

	onRefreshAuthenticators() {
		this.refreshService.refresh();
	}

	showRegister() {
		const dialogRef = this.dialogService.open(RegisterComponent, {
			panelClass: 'register-dialog-container',
			disableClose: true
		});

		dialogRef.componentRef.instance.onClose.subscribe(() => {
			dialogRef.close();
			this.refreshService.refresh();
		});
	}
}
