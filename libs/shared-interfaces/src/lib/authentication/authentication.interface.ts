import { User } from '../user/user.interface';

export interface Authentication {
	/** String in base64 encoding */
	id: string;

	/** Device register name `${browser}/${os}/${platform}` */
	device: string;

	/** UUID for WebAuthn */
	aaguid: string;

	/** Crendtial Device Type
	 * @example 'singleDevice' | 'multiDevice'
	 * */
	credentialDeviceType: string;

	createAt: string;

	user: User;

	/** Encode to base64url */
	credentialID: string;

	credentialPublicKey: Uint8Array;

	counter: number;
}
