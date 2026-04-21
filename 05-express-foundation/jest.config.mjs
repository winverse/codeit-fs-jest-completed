import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const { makeJestConfig } = require("../../../tools/jest-esm-config.cjs");

export default makeJestConfig();
