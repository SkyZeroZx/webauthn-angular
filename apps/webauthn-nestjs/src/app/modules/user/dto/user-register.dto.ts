import { ApiProperty } from '@nestjs/swagger';
import { RegisterUser } from '@skyzerozx/shared-interfaces';
import { IsString, MaxLength, MinLength } from 'class-validator';

export class UserRegisterDto implements RegisterUser {
	@ApiProperty()
	@MinLength(5)
	@MaxLength(255)
	username: string;

	@ApiProperty()
	@MinLength(5)
	@MaxLength(150)
	password: string;

	@ApiProperty()
	@IsString()
	@MinLength(2)
	@MaxLength(80)
	name: string;

	@ApiProperty()
	@IsString()
	@MinLength(2)
	@MaxLength(255)
	lastName: string;
}
