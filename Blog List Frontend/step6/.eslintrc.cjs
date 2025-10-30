module.exports = {
  // Specify the environment where the code runs
  env: {
    browser: true, // Browser global variables available
    es2020: true, // Adds all ECMAScript 2020 globals
    node: true, // Node.js global variables and Node.js scoping
  },
  // Specify the parser for ESLint
  extends: [
    'eslint:recommended', // Use recommended ESLint rules
    'plugin:react/recommended', // Use recommended React rules
    'plugin:react-hooks/recommended', // Use recommended React Hooks rules
    'plugin:jsx-a11y/recommended', // Use recommended accessibility rules (optional but recommended)
  ],
  // Configure the parser options
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    // Allow JSX syntax
    ecmaFeatures: {
      jsx: true,
    },
  },
  // Define plugins used in the configuration
  plugins: ['react', 'react-refresh'],
  // Custom rules configuration
  rules: {
    // General JavaScript rules
    'indent': ['error', 2],
    'linebreak-style': ['error', 'unix'],
    'quotes': ['error', 'single'],
    'semi': ['error', 'never'],
    'eqeqeq': 'error',
    'no-trailing-spaces': 'error',
    'object-curly-spacing': ['error', 'always'],
    'arrow-spacing': ['error', { before: true, after: true }],
    'no-console': 0, // Allow console.log for development

    // React specific rules
    'react/prop-types': 0, // Disable prop-types validation (often replaced by TypeScript)
    'react/react-in-jsx-scope': 'off', // Necessary for React 17+ / New JSX Transform
    'react/jsx-uses-react': 'off',
    'react/jsx-uses-vars': 'error',

    // Rule for Vite's fast refresh utility
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
  },
  settings: {
    react: {
      version: 'detect', // Automatically detect the version of React to use
    },
  },
}
