"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jest_1 = __importDefault(require("next/jest"));
const createJestConfig = (0, jest_1.default)({
    dir: './'
});
const customJestConfig = {
    setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
    moduleDirectories: ['node_modules, <rootDir>/'],
    testEnvironment: 'jest-environment-jsdom',
};
exports.default = createJestConfig(customJestConfig);
//# sourceMappingURL=jest.config.js.map