import { nxE2EPreset } from '@nx/cypress/plugins/cypress-preset';

import { defineConfig } from 'cypress';

export default defineConfig({
	e2e: {
		...nxE2EPreset(__filename, {
			cypressDir: 'src',
			webServerCommands: {
				default: 'npx nx run webauthn-angular:serve',
				production: 'npx nx run webauthn-angular:serve-static'
			},
			ciWebServerCommand: 'npx nx run webauthn-angular:serve-static',
			ciBaseUrl: 'http://localhost:4200'
		}),
		baseUrl: 'http://localhost:4200',
		waitForAnimations: true,
		viewportWidth: 1500,
		viewportHeight: 932,
		env: {
			user: {
				username: 'ngConfDemo',
				password: 'Admin123'
			},
			api: {
				url: 'http://localhost:3000'
			}
		}
	}
});
