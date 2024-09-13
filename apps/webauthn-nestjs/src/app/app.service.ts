import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
	getData() {
		return { message: 'Angular WebAuthn 01.00' };
	}
}
