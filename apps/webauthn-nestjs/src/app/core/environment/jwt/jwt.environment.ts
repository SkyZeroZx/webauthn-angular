import { env } from 'process';
import { config } from 'dotenv';
import { JwtConfig } from './jwt.interface';

config();

export const jwtConfig: JwtConfig = {
	secretToken: env.JWT_SECRET_TOKEN,
	expireTime: env.JWT_EXPIRE_TIME
};
