import { addVirtualAuthenticator } from '../utils/utils';

describe('webauthn-angular-e2e', () => {
	const { username, password } = Cypress.env('user');
	beforeEach(() => cy.visit('/'));

	it('Should login with WebAuthn', () => {
		cy.login(username, password);

		addVirtualAuthenticator();
		cy.intercept('GET', '/api/auth/generate-registration-options').as(
			'generateRegistrationOptions'
		);
		cy.intercept('POST', '/api/auth/verify-registration').as('verifyRegistration');

		cy.get('[data-test-id=button-register-webauthn]').click();

		cy.wait(['@generateRegistrationOptions', '@verifyRegistration']).then(
			([generateRegistrationOptionsResponse, verifyRegistrationResponse]) => {
				expect(generateRegistrationOptionsResponse.response?.statusCode).to.eq(200);
				expect(verifyRegistrationResponse.response?.statusCode).to.eq(201);
			}
		);

		cy.wait(2_000);

		cy.intercept('/api/auth/generate-authentication-options').as('generateAuthenticationOptions');

		cy.intercept('/api/auth/verify-authentication').as('verifyAuthentication');
		
		cy.logout();

		cy.get('[data-test-id=button-login-webauthn]').click();

		cy.wait(['@generateAuthenticationOptions', '@verifyAuthentication']).then(
			([generateAuthenticationOptionsResponse, verifyAuthenticationResponse]) => {
				expect(generateAuthenticationOptionsResponse.response?.statusCode).to.eq(200);
				expect(verifyAuthenticationResponse.response?.statusCode).to.eq(201);
			}
		);
	});
});
