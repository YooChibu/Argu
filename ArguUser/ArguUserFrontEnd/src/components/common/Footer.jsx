import './Footer.css'

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h4>Argu</h4>
            <p>건설적인 논쟁을 통한 성장</p>
          </div>
          <div className="footer-section">
            <h4>이용안내</h4>
            <a href="/about">소개</a>
            <a href="/rules">이용규칙</a>
          </div>
          <div className="footer-section">
            <h4>문의</h4>
            <p>contact@argu.com</p>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2025 Argu. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer








