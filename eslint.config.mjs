import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';

export default [
  { files: ["**/*.{js,mjs,cjs,ts}"] },
  { files: ["**/*.js"], languageOptions: { sourceType: "commonjs" } },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  {
    rules: {
      eqeqeq: "off",
      "prefer-const": ["error", { ignoreReadBeforeAssign: true }],
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-unused-vars": "error",
      "no-unused-vars": "off"
    },
  },
  {
    ignores: ["node_modules/*", "dist/*"]
  },
  eslintPluginPrettierRecommended,
];