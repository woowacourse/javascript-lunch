import eslintPluginPrettier from "eslint-plugin-prettier";
import eslintConfigPrettier from "eslint-config-prettier";

export default [
  {
    files: ["**/*.js"],
    languageOptions: {
      ecmaVersion: "latest",
    },
    plugins: {
      prettier: eslintPluginPrettier,
    },
    rules: {
      "max-depth": ["error", 1],
      "max-params": ["error", 3],
      "max-lines-per-function": ["error", { max: 10 }],
      ...eslintConfigPrettier.rules,
      "prettier/prettier": "error",
    },
  },
];
