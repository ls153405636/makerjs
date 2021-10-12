module.exports = {
    root: true,
    settings: {
        react: {
            version: "detect",
        }
    },
    env: {
        "browser": true,
        "node": true,
        "es6": true
    },
    globals: {
        "$": true,
        "PIXI": true,
        "THREE": true,
        "globalThis": false
    },
    parser: "babel-eslint",
    parserOptions: {
        "ecmaVersion": 2020,
        "sourceType": "module"
    },
    plugins: [
        "react-hooks",
        "unused-imports"
    ],
    extends: [
        "eslint:recommended",
        // "plugin:react/recommended",
        // "plugin:react-hooks/recommended",
        "prettier"
    ],
    rules: {
        "react-hooks/rules-of-hooks": "error",
        "react-hooks/exhaustive-deps": "error",
        "no-unused-vars": "off",
        "no-undef": "error",
        "unused-imports/no-unused-imports": "error",
        "unused-imports/no-unused-vars": [
            "warn",
            {
                "vars": "all",
                "varsIgnorePattern": "^_",
                "args": "after-used",
                "argsIgnorePattern": "^_"
            }
        ]
    }
}
