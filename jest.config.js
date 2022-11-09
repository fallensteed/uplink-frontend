module.exports = {
    collectCoverage: true,
    collectCoverageFrom: ["src/**/*.{js,jsx,ts,tsx}", "!src/**/*.d.ts", "!src/mocks/**"],
    coverageDirectory: "<rootDir>/coverage/",
    coveragePathIgnorePatterns: [],
    coverageProvider: "v8",
    extensionsToTreatAsEsm: [".jsx", ".ts", ".tsx"],
    modulePaths: ["<rootDir>/src"],
    moduleFileExtensions: [
        // Place tsx and ts to beginning as suggestion from Jest team
        // https://jestjs.io/docs/configuration#modulefileextensions-arraystring
        "js",
        "json",
        "jsx",
        "node",
        "ts",
        "tsx",
    ],
    resetMocks: true,
    roots: ["<rootDir>/src"],
    setupFilesAfterEnv: ["./src/setupTests.ts"],
    testEnvironment: "jsdom",
    testMatch: ["<rootDir>/src/**/*.{spec,test}.{js,jsx,ts,tsx}", "<rootDir>/src/**/__tests__/**/*.{js,jsx,ts,tsx}"],
    testTimeout: 30000,
    transform: {
        "^.+\\.(t|j)sx?$": ["babel-jest"],
        "^.+\\.css$": "<rootDir>/.jest/cssTransform.js",
        "^(?!.*\\.(js|jsx|mjs|cjs|ts|tsx|css|json)$)": "<rootDir>/.jest/fileTransform.js",
    },
    transformIgnorePatterns: [
        "[/\\\\]node_modules[/\\\\].+\\.(js|jsx|mjs|cjs|ts|tsx)$",
        "^.+\\.module\\.(css|sass|scss)$",
    ],
    verbose: true,
    watchPlugins: ["jest-watch-typeahead/filename", "jest-watch-typeahead/testname"],
};
