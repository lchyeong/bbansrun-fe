import globals from 'globals';
import parserTs from '@typescript-eslint/parser';
import pluginJs from '@eslint/js';
import pluginPrettier from 'eslint-plugin-prettier';
import pluginReact from 'eslint-plugin-react';
import tseslint from '@typescript-eslint/eslint-plugin';

export default [
  {
    files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'],
    languageOptions: {
      globals: {
        ...globals.browser, // 브라우저 환경 설정
        ...globals.node, // Node.js 환경 설정 추가 (process 등 전역 변수 인식)
      },
      parser: parserTs, // TypeScript 파서를 설정
    },
    plugins: {
      '@typescript-eslint': tseslint,
      react: pluginReact,
      prettier: pluginPrettier,
    },
    rules: {
      ...pluginJs.configs.recommended.rules,
      ...tseslint.configs['recommended'].rules,
      ...pluginReact.configs.recommended.rules,
      'prettier/prettier': 'error', // Prettier 규칙을 ESLint 규칙으로 사용
      'react/react-in-jsx-scope': 'off',
    },
  },
];
