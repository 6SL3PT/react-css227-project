module.exports = {
    env: {
        browser: true,
        es2021: true,
    },
    extends: ['prettier', 'plugin:node/recommended'],
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
        ecmaVersion: 'latest',
        sourceType: 'module',
    },
    plugins: ['react', 'prettier'],
    rules: {
        'prettier/prettier': 'error',
        'no-console': 'off',
        'func-names': 'off',
        'no-process-exit': 'off',
        'node/no-unsupported-features/es-syntax': 'off',
        'node/no-unpublished-import': 'off',
    },
}
