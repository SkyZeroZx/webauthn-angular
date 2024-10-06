import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { MatButtonModule,   } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { Authentication } from '@skyzerozx/shared-interfaces';
import { BufferToBase64Pipe } from '../../../../core/pipes';

@Component({
	selector: 'app-authenticator',
	standalone: true,
	imports: [MatCardModule, MatButtonModule, MatListModule, MatIconModule, BufferToBase64Pipe],
	templateUrl: './authenticator.component.html',
	styleUrl: './authenticator.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class AuthenticatorComponent {
	authenticator = input<Authentication>();
}
