import { provideMarkdown } from 'ngx-markdown';

import { MAT_SNACK_BAR_CONFIG } from '@/core/config';
import { GLOBAL_ERROR_HANDLER } from '@/core/errors';
import { errorInterceptor, progressInterceptor, tokenInterceptor } from '@/core/interceptors';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideRouter, withHashLocation } from '@angular/router';

import { appRoutes } from './app.routes';

export const appConfig: ApplicationConfig = {
	providers: [
		importProvidersFrom([MatDialogModule, MatSnackBarModule]),
		provideZoneChangeDetection({ eventCoalescing: true }),
		provideRouter(appRoutes, withHashLocation()),
		provideHttpClient(
			withFetch(),
			withInterceptors([tokenInterceptor, errorInterceptor, progressInterceptor])
		),
		provideAnimationsAsync(),
		provideMarkdown(),
		MAT_SNACK_BAR_CONFIG,
		GLOBAL_ERROR_HANDLER
	]
};
