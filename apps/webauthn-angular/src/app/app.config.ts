import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withHashLocation } from '@angular/router';

import { appRoutes } from './app.routes';
import { tokenInterceptor } from './core/interceptors';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

export const appConfig: ApplicationConfig = {
	providers: [
		provideZoneChangeDetection({ eventCoalescing: true }),
		provideRouter(appRoutes, withHashLocation()),
		provideHttpClient(withFetch(), withInterceptors([tokenInterceptor])), provideAnimationsAsync()
	]
};
