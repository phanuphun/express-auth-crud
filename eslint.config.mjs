import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';


/** @type {import('eslint').Linter.Config[]} */
export default [
    {
        files: ['**/*.{js,mjs,cjs,ts}']
    },
    {
        languageOptions: { globals: globals.browser }
    },
    {
        rules: {
            'eqeqeq': 'error',
            'prefer-const': 'error',
            'no-unused-vars': 'error',
            'no-undef': 'error',
            'no-console': 'warn',
            'no-var': 'error',
            'no-empty-function': 'warn',
            'no-mixed-spaces-and-tabs': 'error',
            'no-debugger': 'error',
            'semi': ['error', 'always'],
            'quotes': ['error', 'single', {
                'allowTemplateLiterals': true,
                'avoidEscape': true
            }],
        },
    },
    {
        "extends": ["eslint:recommended", "plugin:prettier/recommended"]
    },
    pluginJs.configs.recommended,
    ...tseslint.configs.recommended,
];
