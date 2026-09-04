import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import reactX from 'eslint-plugin-react-x';
import reactDom from 'eslint-plugin-react-dom';
import tseslint from 'typescript-eslint';
import stylistic from '@stylistic/eslint-plugin';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import { defineConfig, globalIgnores } from 'eslint/config';

const jsRules = {
  'semi': ['error', 'always'],
  'quotes': ['error', 'single', { 'avoidEscape': true }],
  'comma-dangle': ['error', 'always-multiline'],
  'object-curly-spacing': ['error', 'always'],
  'no-multiple-empty-lines': ['error', { max: 1, maxEOF: 0 }],
  'max-len': [
    'error',
    {
      code: 100,
      tabWidth: 2,
      ignoreUrls: true,
      ignoreStrings: true,
      ignoreTemplateLiterals: true,
      ignoreRegExpLiterals: true,
    },
  ],
  '@stylistic/indent': ['error', 2],
  '@stylistic/no-trailing-spaces': ['error'],
};

const tsRules = {
  '@typescript-eslint/unbound-method': 'off',
};

const reactRules = {
  // Stylistic rules for JSX
  '@stylistic/jsx-max-props-per-line': [
    'error',
    { maximum: { single: 3, multi: 1 } },
  ],
  '@stylistic/jsx-first-prop-new-line': ['error', 'multiline-multiprop'],
  '@stylistic/jsx-closing-bracket-location': ['error', 'line-aligned'],

  // Accessibility rules for JSX
  ...jsxA11y.flatConfigs.recommended.rules,
  'jsx-a11y/anchor-is-valid': 'error',
  'jsx-a11y/no-autofocus': 'warn',
};

export default defineConfig([
  globalIgnores(['dist', 'src/routeTree.gen.ts']),
  {
    files: ['**/*.{js,mjs,cjs}'],
    extends: [js.configs.recommended],
    plugins: { '@stylistic': stylistic },
    languageOptions: {
      globals: {
        ...globals.node,
      },
    },
    rules: {
      ...jsRules,
    },
  },
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      tseslint.configs.strictTypeChecked,
      tseslint.configs.stylisticTypeChecked,
      reactX.configs['recommended-typescript'],
      reactDom.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    plugins: {
      '@stylistic': stylistic,
      'jsx-a11y': jsxA11y,
    },
    languageOptions: {
      globals: globals.browser,
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
    },
    rules: {
      ...jsRules,
      ...tsRules,
      ...reactRules,
    },
  },
]);
