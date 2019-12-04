module.exports = {
    root: true,
    env: {
        browser: true,
        'jest/globals': true,
    },
    parserOptions: {
        parser: 'babel-eslint',
        ecmaVersion: 2018,
        sourceType: 'module',
        allowImportExportEverywhere: false,
    },
    extends: [
        'airbnb-base',
    ],
    plugins: [
        'jest',
    ],
    rules: {
        'import/extensions': ['error', 'always', {
            js: 'never',
            vue: 'never',
            ts: 'never',
        }],
        'import/no-extraneous-dependencies': 'off',
        'import/no-dynamic-require': 'off',
        'arrow-parens': 'off',
        'indent': ['error', 4],
        'no-shadow': 'warn',
        'global-require': 'off',
        'no-underscore-dangle': 'off',
        'no-bitwise': 'off',
        'prefer-promise-reject-errors': 'off',
        'no-trailing-spaces': 'off',
        'no-restricted-globals': 'off',
        'no-param-reassign': 'off',
    },
};
