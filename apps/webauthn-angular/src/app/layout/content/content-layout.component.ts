import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { ProgressService } from '../../services/progress';

@Component({
	selector: 'app-content-layout',
	standalone: true,
	imports: [RouterModule, NavBarComponent, MatProgressBarModule],
	templateUrl: './content-layout.component.html',
	styleUrl: './content-layout.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContentLayoutComponent {
	private readonly progressService = inject(ProgressService);

	isVisible = this.progressService.isVisible;
}
