module.exports = {
    roots: ["<rootDir>/src"],
    modulePaths: ["<rootDir>/src"],
    collectCoverage: true,
    collectCoverageFrom: ["src/**/*.{js,jsx,ts,tsx}", "!src/**/*.d.ts"],
    setupFilesAfterEnv: ["<rootDir>/src/setupTests.ts"],
    testMatch: ["<rootDir>/src/**/__tests__/**/*.{js,jsx,ts,tsx}", "<rootDir>/src/**/*.{spec,test}.{js,jsx,ts,tsx}"],
    testEnvironment: "jsdom",
    resetMocks: true,
    moduleNameMapper: { "^.+\\.module\\.(css|sass|scss)$": "identity-obj-proxy" },
    transformIgnorePatterns: ["^.+\\.module\\.(css|sass|scss)$"],
    transform: {
        "^.+\\.(t|j)sx?$": ["babel-jest"],
        "^.+\\.css$": "<rootDir>/.jest/cssTransform.js",
        "^(?!.*\\.(js|jsx|mjs|cjs|ts|tsx|css|json)$)": "<rootDir>/.jest/fileTransform.js",
    },
};
