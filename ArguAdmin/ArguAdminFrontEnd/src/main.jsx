/**
 * 애플리케이션 진입점 (Entry Point)
 * 
 * React 애플리케이션의 시작점입니다.
 * 
 * 주요 기능:
 * - React 애플리케이션을 DOM에 마운트
 * - React.StrictMode로 개발 모드에서 추가 검사 활성화
 * - 전역 CSS 스타일 적용
 */

import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './styles/index.css'
import { registerQuillModules } from './utils/quillConfig'

// Quill 모듈 등록 (앱 시작 시 한 번만 실행)
registerQuillModules()

// React 애플리케이션을 DOM에 마운트
// React.StrictMode: 개발 모드에서 추가 검사 및 경고 제공
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)

// react-quill의 findDOMNode 경고 억제 (개발 모드에서만)
if (process.env.NODE_ENV === 'development') {
  const originalError = console.error
  console.error = (...args) => {
    if (
      typeof args[0] === 'string' &&
      args[0].includes('findDOMNode is deprecated')
    ) {
      return // 경고 무시
    }
    originalError.apply(console, args)
  }
}

