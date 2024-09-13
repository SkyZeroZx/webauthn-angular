import { compare } from 'bcryptjs';
import { Strategy } from 'passport-local';

import { UserService } from '@/user';
import { Injectable, Logger } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
	private readonly logger = new Logger(LocalStrategy.name);
	constructor(private readonly userService: UserService) {
		super();
	}

	async validate(username: string, password: string) {
		this.logger.log({ message: 'validating user', data: username });

		const user = await this.userService.findByUsername(username);

		if (!user) {
			this.logger.warn({ message: 'User Not Found', data: username });
			return null;
		}

		const { password: hashPassword, ...userProfile } = user;

		const matchPassword = await compare(password, hashPassword);

		if (!matchPassword) {
			this.logger.warn({
				message: 'Falied Authenticated User password not match',
				data: username
			});
			return null;
		}

		return userProfile;
	}
}
