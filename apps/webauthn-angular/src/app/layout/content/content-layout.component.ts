import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
	selector: 'app-content-layout',
	standalone: true,
	imports: [RouterModule],
	templateUrl: './content-layout.component.html',
	styleUrl: './content-layout.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContentLayoutComponent {}
