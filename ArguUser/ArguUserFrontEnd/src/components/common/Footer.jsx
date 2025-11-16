/**
 * Footer 컴포넌트
 * 
 * 애플리케이션의 하단 푸터입니다.
 * 
 * 주요 기능:
 * - 사이트 정보 표시
 * - 이용안내 링크
 * - 문의 정보
 * - 저작권 정보
 */

import './Footer.css'

/**
 * Footer 컴포넌트
 * 
 * @returns {JSX.Element} 푸터 컴포넌트
 */
const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          {/* 사이트 정보 섹션 */}
          <div className="footer-section">
            <h4>Argu</h4>
            <p>건설적인 논쟁을 통한 성장</p>
          </div>
          
          {/* 이용안내 섹션 */}
          <div className="footer-section">
            <h4>이용안내</h4>
            <a href="/about">소개</a>
            <a href="/rules">이용규칙</a>
          </div>
          
          {/* 문의 섹션 */}
          <div className="footer-section">
            <h4>문의</h4>
            <p>contact@argu.com</p>
          </div>
        </div>
        
        {/* 저작권 정보 */}
        <div className="footer-bottom">
          <p>&copy; 2025 Argu. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer








