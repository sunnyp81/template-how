import js from '@eslint/js';
import ts from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import astro from 'eslint-plugin-astro';

export default [
  js.configs.recommended,
  {
    files: ['**/*.ts', '**/*.tsx'],
    languageOptions: {
      parser: tsParser,
      parserOptions: { ecmaVersion: 2022, sourceType: 'module' }
    },
    plugins: { '@typescript-eslint': ts },
    rules: {
      ...ts.configs.recommended.rules,
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }]
    }
  },
  ...astro.configs['flat/recommended'],
  {
    files: ['scripts/**/*.ts'],
    languageOptions: { globals: { process: 'readonly', console: 'readonly' } }
  },
  { ignores: ['dist/', '.astro/', 'node_modules/', 'test-results/', 'playwright-report/', '.lighthouseci/'] }
];
