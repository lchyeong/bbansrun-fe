import globals from "globals";
import parserTs from "@typescript-eslint/parser";
import pluginJs from "@eslint/js";
import pluginPrettier from "eslint-plugin-prettier";
import pluginReact from "eslint-plugin-react";
import tseslint from "@typescript-eslint/eslint-plugin";

export default [
  {
    files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"],
    languageOptions: {
      globals: globals.browser,
      parser: parserTs, // TypeScript 파서를 설정
    },
    plugins: {
      "@typescript-eslint": tseslint,
      react: pluginReact,
      prettier: pluginPrettier,
    },
    rules: {
      ...pluginJs.configs.recommended.rules,
      ...tseslint.configs["recommended"].rules,
      ...pluginReact.configs.recommended.rules,
      "prettier/prettier": "error", // Prettier 규칙을 ESLint 규칙으로 사용
    },
  },
];
