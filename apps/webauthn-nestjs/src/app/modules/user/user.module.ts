import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserEntity } from './entities/user.entity';
import { UserService } from './user.service';
import { UserController } from './user.controller';

@Module({
	controllers: [UserController],
	imports: [TypeOrmModule.forFeature([UserEntity])],
	providers: [UserService],
	exports: [UserService]
})
export class UserModule {}
