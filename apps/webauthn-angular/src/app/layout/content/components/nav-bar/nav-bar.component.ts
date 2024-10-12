import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { AuthService } from '../../../../services/auth';

@Component({
	selector: 'app-nav-bar',
	standalone: true,
	imports: [
		MatToolbarModule,
		MatButtonModule,
		MatIconModule,
		MatExpansionModule,
		MatListModule,
		MatMenuModule
	],
	templateUrl: './nav-bar.component.html',
	styleUrl: './nav-bar.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavBarComponent {
	private readonly authService = inject(AuthService);
	user = this.authService.user;

	logout(): void {
		this.authService.logout();
	}
}
