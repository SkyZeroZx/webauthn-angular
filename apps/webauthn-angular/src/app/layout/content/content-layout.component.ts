import { ProgressService } from '@/services/progress';
import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { RouterModule } from '@angular/router';

import { NavBarComponent } from './components/nav-bar/nav-bar.component';

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

	visibility = computed(() => (this.progressService.isVisible() ? 'visible' : 'hidden'));
}
