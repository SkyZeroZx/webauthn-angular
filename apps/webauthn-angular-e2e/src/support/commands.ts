/// <reference types="cypress" />

// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************

// eslint-disable-next-line @typescript-eslint/no-namespace
declare namespace Cypress {
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	interface Chainable<Subject> {
		login(email: string, password: string): void;
		logout(): void;
	}
}

// -- This is a parent command --
Cypress.Commands.add('login', (email, password) => {
	cy.visit('/');
	cy.intercept('/api/auth/login').as('login');

	cy.get('[data-test-id=button-have-account]').click();
	// eslint-disable-next-line cypress/no-unnecessary-waiting
	cy.wait(200); // Add delay because take some milliseconds render new component

	cy.get('[data-test-id=username]').type(email);
	cy.get('[data-test-id=password]').type(password);
	cy.get('[data-test-id=button-login]').click();
	cy.wait('@login');
});

// -- This is a parent command --
Cypress.Commands.add('logout', () => {
	cy.get('[data-test-id=button-user-options]').click();
	cy.get('[data-test-id=button-logout]').click();
	cy.window().then((window) => {
		const token = window.localStorage.getItem('token');
		const username = window.localStorage.getItem('username');
		expect(token).to.be.null;

		expect(username).to.not.be.empty;
		// window.location.reload();
	});
});

//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })
