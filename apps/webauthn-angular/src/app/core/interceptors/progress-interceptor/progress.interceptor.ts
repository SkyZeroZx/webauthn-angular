import { finalize } from 'rxjs';

import { ProgressService } from '@/services/progress';
import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';

export const progressInterceptor: HttpInterceptorFn = (req, next) => {
	const progressBarService = inject(ProgressService);

	progressBarService.show();

	return next(req).pipe(finalize(() => progressBarService.hide()));
};
