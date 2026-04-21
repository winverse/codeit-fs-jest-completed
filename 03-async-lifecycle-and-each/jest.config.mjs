export default {
  testEnvironment: "node",
  testMatch: ["<rootDir>/src/**/*.spec.ts"],
  extensionsToTreatAsEsm: [".ts"],
  setupFilesAfterEnv: ["<rootDir>/src/jest-basics/setup.ts"],
  moduleFileExtensions: ["ts", "js", "json"],
  transform: {
    "^.+\\.ts$": [
      "ts-jest",
      {
        useESM: true,
        tsconfig: "<rootDir>/tsconfig.json",
      },
    ],
  },
  moduleNameMapper: {
    "^(\\.{1,2}/.*)\\.js$": "$1",
    "^#jest-basics/(.*)\\.js$": "<rootDir>/src/jest-basics/$1",
  },
};
