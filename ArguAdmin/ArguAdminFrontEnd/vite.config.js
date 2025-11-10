/**
 * Vite 설정 파일
 * 
 * Vite는 빠른 개발 서버와 빌드 도구입니다.
 * 
 * 주요 설정:
 * - React 플러그인 사용
 * - 개발 서버 포트: 9102
 * - API 프록시 설정: /api 요청을 백엔드 서버(9101)로 전달
 * 
 * 참고: https://vitejs.dev/config/
 */

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

/**
 * Vite 설정
 * 
 * @returns {import('vite').UserConfig} Vite 설정 객체
 */
export default defineConfig({
  // React 플러그인: JSX 변환 및 Fast Refresh 지원
  plugins: [react()],
  
  // 개발 서버 설정
  server: {
    // 개발 서버 포트 번호
    port: 9102,
    
    // 프록시 설정
    // /api로 시작하는 요청을 백엔드 서버로 전달
    proxy: {
      '/api': {
        // 백엔드 서버 주소 (Spring Boot)
        target: 'http://localhost:9101',
        // Origin 헤더를 타겟 서버의 호스트로 변경
        changeOrigin: true,
      }
    }
  }
})

