import { Injectable, ExecutionContext, UnauthorizedException, Logger } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
	private readonly logger = new Logger(JwtAuthGuard.name);

	handleRequest(
		err: unknown,
		user: any,
		info: unknown,
		context: ExecutionContext,
		status?: unknown
	) {
		if (err || !user) {
			this.logger.warn({ message: 'Jwt Unauthorized', data: { info, status, context , err } });
			throw err || new UnauthorizedException('You are not authenticated');
		}
		return user;
	}
}
