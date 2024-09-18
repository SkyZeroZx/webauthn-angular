import { Route } from '@angular/router';
import { LandingComponent } from './pages/landing/landing.component';
import { ContentLayoutComponent } from './layout/content/content-layout.component';

export const appRoutes: Route[] = [
	{
		path: '',
		component: ContentLayoutComponent,
		children: [
			{
				path: '',
				component: LandingComponent
			}
		]
	}
];
