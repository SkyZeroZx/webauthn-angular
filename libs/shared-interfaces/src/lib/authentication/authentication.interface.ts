import { User } from '../user/user.interface';

export interface Authentication {
	/* String in base64 encoding*/
	id: string;
    
	user: User;

	/* String Encode to base64url */
	credentialID: string;

	credentialPublicKey: Buffer;

 	counter: number;
}
