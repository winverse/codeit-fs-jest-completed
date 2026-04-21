function makeJestConfig(options = {}) {
  const {
    setupFilesAfterEnv,
    roots = ["<rootDir>/src"],
    testMatch = ["**/*.spec.ts"],
    moduleNameMapper = {},
    collectCoverageFrom = ["src/**/*.ts", "!src/**/*.d.ts"],
    coveragePathIgnorePatterns = [
      "/node_modules/",
      "/src/main.ts",
      "/src/server.ts",
    ],
  } = options;

  const config = {
    preset: "ts-jest/presets/default-esm",
    testEnvironment: "node",
    clearMocks: true,
    roots,
    testMatch,
    extensionsToTreatAsEsm: [".ts"],
    transform: {
      "^.+\\.ts$": [
        "ts-jest",
        {
          useESM: true,
          tsconfig: "./tsconfig.json",
        },
      ],
    },
    moduleNameMapper: {
      "^(\\.{1,2}/.*)\\.js$": "$1",
      ...moduleNameMapper,
    },
    collectCoverageFrom,
    coverageDirectory: "<rootDir>/coverage",
    coveragePathIgnorePatterns,
  };

  if (setupFilesAfterEnv) {
    config.setupFilesAfterEnv = setupFilesAfterEnv;
  }

  return config;
}

module.exports = {
  makeJestConfig,
};
