import { Route } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ContentLayoutComponent } from './layout/content/content-layout.component';

export const appRoutes: Route[] = [
	{
		path: '',
		component: ContentLayoutComponent,
		children: [
			{
				path: '',
				component: HomeComponent
			}
		]
	}
];
