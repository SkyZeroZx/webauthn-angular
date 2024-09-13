import { Repository } from 'typeorm';

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RegisterUser, User } from '@skyzerozx/shared-interfaces';

import { UserEntity } from './entities/user.entity';

@Injectable()
export class UserService {
	constructor(
		@InjectRepository(UserEntity)
		private readonly userRepository: Repository<UserEntity>
	) {}

	async register(createUser: RegisterUser) {
		const userEntity = this.userRepository.create(createUser);
		const user = await this.userRepository.save(userEntity);
		delete user.password;

		return user;
	}

	findByUsername(username: string): Promise<User> {
		return this.userRepository.findOne({
			where: { username }
		});
	}
}
