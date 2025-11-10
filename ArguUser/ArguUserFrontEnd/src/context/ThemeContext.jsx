/**
 * 테마 컨텍스트 (Theme Context)
 * 
 * 다크모드/라이트모드 테마를 전역적으로 관리하는 Context API입니다.
 * 
 * 주요 기능:
 * - 테마 상태 관리 (light/dark)
 * - localStorage에 테마 설정 저장
 * - HTML data-theme 속성 자동 업데이트
 * - 테마 전환 기능
 */

import { createContext, useContext, useState, useEffect } from 'react'

// ThemeContext 생성
const ThemeContext = createContext(null)

/**
 * useTheme 훅
 * 
 * ThemeContext를 사용하기 위한 커스텀 훅입니다.
 * ThemeProvider 외부에서 사용하면 에러를 발생시킵니다.
 * 
 * @returns {Object} 테마 관련 상태 및 함수들
 * @throws {Error} ThemeProvider 외부에서 사용 시 에러 발생
 */
export const useTheme = () => {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider')
  }
  return context
}

/**
 * ThemeProvider 컴포넌트
 * 
 * 테마 관련 상태와 함수를 제공하는 Provider 컴포넌트입니다.
 * 
 * @param {Object} props - 컴포넌트 props
 * @param {React.ReactNode} props.children - 자식 컴포넌트
 * @returns {JSX.Element} ThemeContext.Provider
 */
export const ThemeProvider = ({ children }) => {
  /**
   * 테마 상태 초기화
   * 
   * localStorage에 저장된 테마가 있으면 사용하고,
   * 없으면 기본값 'light'를 사용합니다.
   */
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem('theme')
    return savedTheme || 'light'
  })

  /**
   * 테마 변경 시 실행되는 useEffect
   * 
   * 테마가 변경되면:
   * - HTML 문서의 data-theme 속성을 업데이트 (CSS 변수 적용)
   * - localStorage에 테마 설정 저장 (다음 접속 시 유지)
   */
  useEffect(() => {
    // HTML 문서의 data-theme 속성 설정 (CSS에서 [data-theme="dark"] 선택자로 다크모드 스타일 적용)
    document.documentElement.setAttribute('data-theme', theme)
    // localStorage에 테마 설정 저장
    localStorage.setItem('theme', theme)
  }, [theme])

  /**
   * 테마 전환 함수
   * 
   * 현재 테마가 'light'이면 'dark'로, 'dark'이면 'light'로 전환합니다.
   */
  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light')
  }

  // Context에 제공할 값
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}








