/**
 * It enables the WebAuthn protocol, then adds a virtual authenticator to the browser
 * @returns The authenticatorId is being returned.
 */
export function addVirtualAuthenticator() {
	return Cypress.automation('remote:debugger:protocol', {
		command: 'WebAuthn.enable',
		params: {}
	}).then((result) => {
		console.log('WebAuthn.enable', result);
		return Cypress.automation('remote:debugger:protocol', {
			command: 'WebAuthn.addVirtualAuthenticator',
			params: {
				options: {
					protocol: 'ctap2',
					transport: 'internal',
					hasResidentKey: true,
					hasUserVerification: true,
					isUserVerified: true
				}
			}
		}).then((result) => {
			console.log('WebAuthn.addVirtualAuthenticator', result);
			return result.authenticatorId;
		});
	});
}
