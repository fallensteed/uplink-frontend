module.exports = {
    roots: ["<rootDir>/src"],
    collectCoverage: true,
    collectCoverageFrom: ["src/**/*.{js,jsx,ts,tsx}", "!src/**/*.d.ts"],
    setupFilesAfterEnv: ["<rootDir>/src/setupTests.ts"],
    testMatch: ["<rootDir>/src/**/__tests__/**/*.{js,jsx,ts,tsx}", "<rootDir>/src/**/*.{spec,test}.{js,jsx,ts,tsx}"],
    testEnvironment: "jsdom",
    resetMocks: true,
};
