import { applyDecorators, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../guards';

export function Auth() {
	return applyDecorators(UseGuards(JwtAuthGuard));
}
