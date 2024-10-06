import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideRouter, withHashLocation } from '@angular/router';

import { appRoutes } from './app.routes';
import { errorInterceptor, tokenInterceptor } from './core/interceptors';

export const appConfig: ApplicationConfig = {
	providers: [
		provideZoneChangeDetection({ eventCoalescing: true }),
		provideRouter(appRoutes, withHashLocation()),
		provideHttpClient(withFetch(), withInterceptors([tokenInterceptor, errorInterceptor])),
		provideAnimationsAsync()
	]
};
