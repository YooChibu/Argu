/**
 * 테마 컨텍스트 (Theme Context)
 * 
 * 다크모드/라이트모드 테마를 전역적으로 관리하는 Context API입니다.
 */

import { createContext, useContext, useState, useEffect } from 'react'

// ThemeContext 생성
const ThemeContext = createContext(null)

/**
 * useTheme 훅
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
 */
export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem('adminTheme')
    return savedTheme || 'light'
  })

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('adminTheme', theme)
  }, [theme])

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light')
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

