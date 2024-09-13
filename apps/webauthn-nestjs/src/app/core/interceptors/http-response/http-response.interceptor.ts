import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { ResponseFormat } from '@skyzerozx/shared-interfaces';

@Injectable()
export class ResponseInterceptor<T> implements NestInterceptor<T, ResponseFormat<T>> {
	intercept(context: ExecutionContext, next: CallHandler): Observable<ResponseFormat<T>> {
		const now = Date.now();
		const httpContext = context.switchToHttp();
		const request = httpContext.getRequest();

		return next.handle().pipe(
			map((data) => {
				return {
					data,
					isArray: Array.isArray(data),
					path: request.path,
					duration: `${Date.now() - now}ms`,
					method: request.method
				};
			})
		);
	}
}
