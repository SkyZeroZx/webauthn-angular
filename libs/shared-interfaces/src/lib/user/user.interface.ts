import { Authentication } from '../authentication/authentication.interface';

export interface UserProfile {
	id: number;

	username: string;

	name: string;

	lastName: string;

	createdAt: string;

	updateAt: string;
}

export interface User extends UserProfile {
	password: string;

	authentications: Authentication[];
}

export type RegisterUser = Omit<User, 'authentications' | 'createdAt' | 'updateAt' | 'id'>;

export interface UserAuthenticated {
	token: string;
	user: UserProfile;
}
