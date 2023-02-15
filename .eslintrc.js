module.exports = {
  env: {
    es2021: true,
    node: true,
    jest: true,
  },
  extends: ["airbnb-base", "prettier", "plugin:@typescript-eslint/recommended"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: ["prettier"],
  rules: {
    "consistent-return": 0,
    "import/extensions": 0,
    "arrow-body-style": 0,
    "operator-assignment": 0,
    "prettier/prettier": [
      "error",
      {
        endOfLine: "auto",
      },
    ],
    "no-undef": 0,
    "no-underscore-dangle": 0,
    "import/no-extraneous-dependencies": 0,
    "no-shadow": "off",
    "@typescript-eslint/no-unused-vars": "error",
    "@typescript-eslint/no-explicit-any": 0,
    "no-console": 0,
  },
  settings: {
    "import/resolver": {
      typescript: {}, // this loads <rootdir>/tsconfig.json to eslint
    },
  },
};
