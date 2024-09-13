 
import { UseGuards, applyDecorators } from '@nestjs/common';
import { LocalAuthGuard } from '../guards';
 
export function LoginAuth() {
	return applyDecorators(UseGuards(LocalAuthGuard));
}
