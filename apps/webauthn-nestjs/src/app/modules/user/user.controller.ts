import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { UserRegisterDto } from './dto/user-register.dto';

@Controller('users')
export class UserController {
	constructor(private readonly userService: UserService) {}

	@Post('register')
	register(@Body() userRegisterDto: UserRegisterDto) {
		return this.userService.register(userRegisterDto);
	}
}
