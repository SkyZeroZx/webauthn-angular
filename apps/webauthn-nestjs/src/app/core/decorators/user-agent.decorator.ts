import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { parseUserAgent } from './parse-user-agent';

export const ExtractUserAgent = (data: string, ctx: ExecutionContext) => {
	const request = ctx.switchToHttp().getRequest();
	console.log(request.get('user-agent'));

	return parseUserAgent(request.get('user-agent'));
};

export const UserAgent = createParamDecorator(ExtractUserAgent);
