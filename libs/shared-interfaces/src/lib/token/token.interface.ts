import { UserProfile } from '../user/user.interface';

export type DecodeToken = UserProfile & { iat: number; exp: number };
