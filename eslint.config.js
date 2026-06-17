import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import jsxA11y from 'eslint-plugin-jsx-a11y';
import pluginReact from "eslint-plugin-react";
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
  globalIgnores([
    'dist',
    '.vscode',
      '.github',
      '.idea',
      'node_modules',
      'coverage/',
      'build',
      '.cache',
      'dist',
      'public/',
      '__mocks__/',
      '__tests__/',
      // config files
      'commitlint.config.js',
      'eslint.config.js',
      'jest.config.js',
      'tailwind.config.js',
      'postcss.config.js',
      '*.d.ts',
  ]),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,

      pluginReact.configs.flat.recommended,
      jsxA11y.flatConfigs.recommended,
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
    rules: {
      "no-unused-vars": "off",
      "no-undef": "off",
      "no-console": ["error", { allow: ["warn", "error"] }],

      "react/react-in-jsx-scope": "off",
      "react/display-name": "off",
      "react/function-component-definition": [2, { "namedComponents": "function-declaration" }],

      "react-hooks/rules-of-hooks": "warn",
      "react-hooks/exhaustive-deps": "off",

      "@typescript-eslint/no-inferrable-types": "off",
      "@typescript-eslint/explicit-function-return-type": 'warn',
      "@typescript-eslint/no-empty-function": "error",
      "@typescript-eslint/no-empty-interface": "error",
      "@typescript-eslint/no-useless-empty-export": "error",
      "@typescript-eslint/no-empty-object-type": "warn",
      "@typescript-eslint/no-explicit-any": "warn",

      "jsx-a11y/label-has-associated-control": "warn",

      'react-refresh/only-export-components': [
        'warn',
        {
          allowConstantExport: true,
          allowExportNames: ['meta', 'links', 'headers', 'loader', 'action'],
        },
      ],
    }
  },
])
