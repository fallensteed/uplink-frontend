import { defineConfig } from "cypress";

export default defineConfig({
    video: false,
    backendUrl: "http://localhost:8080/backend",
    viewportWidth: 1920,
    viewportHeight: 1080,
    screenshots: false,
    chromeWebSecurity: false,
    e2e: {
        // We've imported your old cypress plugins here.
        // You may want to clean this up later by importing these.
        setupNodeEvents(on, config) {
            // eslint-disable-next-line @typescript-eslint/no-var-requires
            return require("./cypress/plugins/index.js")(on, config);
        },
        baseUrl: "http://localhost:3000",
        specPattern: "cypress/e2e/**/*.cy.{js,jsx,ts,tsx}",
    },
});
