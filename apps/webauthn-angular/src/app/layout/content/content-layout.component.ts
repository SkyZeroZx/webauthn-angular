import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';

@Component({
	selector: 'app-content-layout',
	standalone: true,
	imports: [RouterModule, NavBarComponent],
	templateUrl: './content-layout.component.html',
	styleUrl: './content-layout.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContentLayoutComponent {}
