/**
 * ESLint 설정 파일
 * 
 * JavaScript/JSX 코드의 품질을 검사하는 린터 설정입니다.
 * 
 * 주요 기능:
 * - React 코드 검사
 * - React Hooks 규칙 검사
 * - ES2020 문법 지원
 * - 브라우저 환경 설정
 * 
 * 참고: https://eslint.org/docs/latest/use/configure/
 */

module.exports = {
  // 루트 설정 파일임을 명시 (상위 디렉토리의 설정 파일을 찾지 않음)
  root: true,
  
  // 실행 환경 설정
  env: { 
    browser: true,  // 브라우저 전역 변수 사용 가능 (window, document 등)
    es2020: true    // ES2020 문법 지원
  },
  
  // 확장할 기본 규칙 세트
  extends: [
    'eslint:recommended',              // ESLint 권장 규칙
    'plugin:react/recommended',        // React 권장 규칙
    'plugin:react/jsx-runtime',        // React 17+ JSX Runtime 규칙
    'plugin:react-hooks/recommended',  // React Hooks 규칙
  ],
  
  // 린터 검사에서 제외할 파일/디렉토리 패턴
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  
  // 파서 옵션
  parserOptions: { 
    ecmaVersion: 'latest',  // 최신 ECMAScript 문법 사용
    sourceType: 'module'    // ES 모듈 사용
  },
  
  // React 플러그인 설정
  settings: { 
    react: { version: '18.2' }  // React 버전 지정
  },
  
  // 사용할 플러그인
  plugins: ['react-refresh'],
  
  // 커스텀 규칙 설정
  rules: {
    // React Fast Refresh 규칙: 컴포넌트만 export하도록 경고
    // allowConstantExport: true - 상수 export는 허용
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    
    // PropTypes 검사 비활성화 (TypeScript를 사용하지 않으므로)
    'react/prop-types': 'off',
  },
}








