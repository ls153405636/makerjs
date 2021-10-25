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
        "unused-imports",
        "unicorn",
    ],
    extends: [
        "eslint:recommended",
        // "plugin:react/recommended",
        // "plugin:react-hooks/recommended",
        "prettier"
    ],
    rules: {
        "react-hooks/rules-of-hooks": "off",
        "react-hooks/exhaustive-deps": "off",
        "no-unused-vars": "off",
        "no-undef": "off",
        "no-debugger": "off",
        "no-unsafe-negation": "off",
        "unused-imports/no-unused-imports": "off",
        "unused-imports/no-unused-vars": [
            "off",
            {
                "vars": "all",
                "varsIgnorePattern": "^_",
                "args": "after-used",
                "argsIgnorePattern": "^_"
            }
        ],
        "unicorn/filename-case": [
            "error",
            {
                "case": "snakeCase",
                "ignore": []
            }
        ],
    }
}
