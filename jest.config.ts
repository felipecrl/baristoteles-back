import { pathsToModuleNameMapper } from 'ts-jest'
import type { Config } from 'jest'

import { compilerOptions } from './tsconfig.json'

const config: Config = {
  clearMocks: true,
  collectCoverage: true,
  collectCoverageFrom: ['<rootDir>/src/modules/**/services/*.ts'],
  coverageDirectory: 'coverage',
  coverageProvider: 'v8',
  coverageReporters: ['text-summary', 'lcov'],
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
    prefix: '<rootDir>/'
  }),
  preset: 'ts-jest',
  testMatch: ['**/*.spec.ts']
}

export default config
