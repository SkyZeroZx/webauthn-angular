import { env } from 'process';
import { config } from 'dotenv';
import { WebAuthnConfig } from './web-authn.interface';

config();

export const webAuthnConfig: WebAuthnConfig = {
	origin: JSON.parse(env.WEB_AUTHN_ORIGIN),
	rpIdArray: JSON.parse(env.WEB_AUTHN_RP_ID_ARRAY),
	rpId: env.WEB_AUTHN_RP_ID,
	rpName : env.WEB_AUTHN_RP_NAME
};
