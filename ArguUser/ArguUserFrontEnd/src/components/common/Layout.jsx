/**
 * Layout 컴포넌트
 * 
 * 애플리케이션의 공통 레이아웃을 제공하는 컴포넌트입니다.
 * 모든 페이지에 공통으로 적용되는 Header와 Footer를 포함합니다.
 * 
 * 주요 기능:
 * - Header 컴포넌트 포함 (네비게이션, 로고, 사용자 메뉴)
 * - Footer 컴포넌트 포함 (사이트 정보, 링크)
 * - 메인 콘텐츠 영역 제공
 */

import Header from './Header'
import Footer from './Footer'

/**
 * Layout 컴포넌트
 * 
 * @param {Object} props - 컴포넌트 props
 * @param {React.ReactNode} props.children - 페이지 콘텐츠
 * @returns {JSX.Element} 레이아웃 컴포넌트
 */
const Layout = ({ children }) => {
  return (
    <div className="app">
      {/* 상단 헤더: 로고, 네비게이션, 사용자 메뉴 */}
      <Header />
      {/* 메인 콘텐츠 영역: 각 페이지의 내용이 여기에 표시됨 */}
      <main className="main">{children}</main>
      {/* 하단 푸터: 사이트 정보, 링크 */}
      <Footer />
    </div>
  )
}

export default Layout








