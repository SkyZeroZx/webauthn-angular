import {
	ArgumentsHost,
	Catch,
	ExceptionFilter,
	HttpException,
	HttpStatus,
	Logger
} from '@nestjs/common';
import { Request } from 'express';

interface IError {
	message: string;
	code_error: string;
	status: number;
}
const ENTITY_NOT_FOUND = 'EntityNotFoundError';

@Catch()
export class AllExceptionFilter implements ExceptionFilter {
	private readonly logger = new Logger(AllExceptionFilter.name);

	catch(exception: unknown, host: ArgumentsHost) {
		const ctx = host.switchToHttp();
		const response = ctx.getResponse();
		const request: Request = ctx.getRequest();

		const { status, message } = this.getMessageException(exception);

		const responseData = {
			...{
				statusCode: status,
				timestamp: new Date().toISOString(),
				path: request.url
			},
			...message
		};

		this.logMessage(request, message, status, exception);

		response.status(status).json(responseData);
	}

	private getMessageException(exception: unknown) {
		if (exception instanceof HttpException) {
			const status = exception.getStatus();
			return { message: exception.getResponse() as IError, code_error: null, status };
		}

		if (exception?.['stack']?.includes(ENTITY_NOT_FOUND)) {
			this.logger.error({ message: 'Error', error: exception });
			return {
				message: { message: 'Not Found Resource' } as IError,
				code_error: null,
				status: HttpStatus.NOT_FOUND
			};
		}

		return {
			message: { message: (exception as Error).message } as IError,
			code_error: null,
			status: HttpStatus.INTERNAL_SERVER_ERROR
		};
	}

	private logMessage(request: Request, message: IError, status: number, exception: unknown) {
		if (status === 500) {
			const msg = `End Request for ${request.path} method=${
				request.method
			} status=${status} code_error=${message.code_error ? message.code_error : null} message=${
				message.message ? message.message : null
			}`;

			this.logger.error({ message: msg, errror: status >= 500 ? exception['stack'] : '' });
		} else {
			const msg = `End Request for ${request.path} method=${
				request.method
			} status=${status} code_error=${message.code_error ? message.code_error : null} message=${
				message.message ? message.message : null
			}`;

			this.logger.warn({ message: msg });
		}
	}
}
