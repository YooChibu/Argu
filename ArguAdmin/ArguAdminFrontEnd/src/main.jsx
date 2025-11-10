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

// React 애플리케이션을 DOM에 마운트
// React.StrictMode: 개발 모드에서 추가 검사 및 경고 제공
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)

