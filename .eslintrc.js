module.exports = {
    parser: "@typescript-eslint/parser", // Specifies the ESLint parser
    parserOptions: {
        ecmaVersion: 2020, // Allows for the parsing of modern ECMAScript features
        sourceType: "module", // Allows for the use of imports
        ecmaFeatures: {
            jsx: true // Allows for the parsing of JSX
        }
    },
    plugins: [
        '@typescript-eslint',
        'react-hooks'
    ],
    settings: {
        react: {
            version: "detect" // Tells eslint-plugin-react to automatically detect the version of React to use
        }
    },
    extends: [
        "eslint:recommended",
        "plugin:react/recommended", // Uses the recommended rules from @eslint-plugin-react
        "plugin:@typescript-eslint/recommended", // Uses the recommended rules from @typescript-eslint/eslint-plugin
        "plugin:@typescript-eslint/recommended",
        "plugin:react/recommended",
        "plugin:react-hooks/recommended"
    ],
    rules: {
        // Place to specify ESLint rules. Can be used to overwrite rules specified from the extended configs
        // e.g. "@typescript-eslint/explicit-function-return-type": "off",
        "indent": [1, "tab"],
        "no-mixed-spaces-and-tabs": 0,
        "default-case": "error",
        "default-param-last": "error",
        "eqeqeq": 1,
        "no-alert": "error",
        "no-empty-function": 1,
        "no-proto": "error",
        "no-unused-vars": 1,
        "no-use-before-define": 1,
        "array-bracket-spacing": [1, "always"],
        "block-spacing": [1, "always"],
        "brace-style": "off",   //using @typescript-eslint/brace-style instead
        "comma-dangle": [1, { "objects": "never" }],
        "comma-spacing": [1, { "before": false, "after": true }],
        "eol-last": ["error", "always"],
        "func-call-spacing": [1, "never"],
        "function-call-argument-newline": [1, "consistent"],
        "key-spacing": [1, { "beforeColon": false }],
        "no-trailing-spaces": 1,
        "object-curly-spacing": [1, "always"],
        "semi": [1, "always"],
        "semi-spacing": 1,
        "arrow-spacing": [1, { "before": true, "after": true }],
        "no-confusing-arrow": 1,
        "no-var": "error",
        "prefer-const": ["error", { "destructuring": "any", "ignoreReadBeforeAssign": false }],
        "rest-spread-spacing": [1, "never"],
        "@typescript-eslint/brace-style": [1, "1tbs", { "allowSingleLine": true }],
        "react/no-access-state-in-setstate": 1,
        "react/no-danger": "error",
        "react/no-deprecated": "error",
        "react/no-this-in-sfc": "error",
        "react/no-unescaped-entities": "error",
        "react/jsx-curly-newline": [1, { multiline: "require", singleline: "forbid" }],
        "react/jsx-curly-spacing": [1, { "when": "always" }],
        "react/jsx-filename-extension": [1, { "extensions": [".ts", ".tsx"] }],
        "react/jsx-first-prop-new-line": [1, "multiline"],
        "react/jsx-max-props-per-line": [1, { "when": "multiline" }],
        "react/jsx-no-target-blank": [1, { "enforceDynamicLinks": "always" }],
        "react/jsx-props-no-multi-spaces": 1,
        "react/jsx-no-useless-fragment": 1,
        "react/jsx-sort-props": 1,
        "react/jsx-tag-spacing": [1, {
            "closingSlash": "never", "beforeSelfClosing": "always", "afterOpening": "never", "beforeClosing": "allow"
        }]
    },
};
