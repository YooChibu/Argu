import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { useTheme } from '../../context/ThemeContext'
import './Header.css'

const Header = () => {
  const { user, logout, isAuthenticated } = useAuth()
  const { theme, toggleTheme } = useTheme()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          <div className="logo">
            <Link to="/">
              <span className="logo-text">Argu</span>
            </Link>
          </div>
          <nav className="nav">
            <Link to="/" className="nav-link">
              홈
            </Link>
            <Link to="/argu" className="nav-link">
              논쟁 목록
            </Link>
          </nav>
          <div className="header-actions">
            <button
              className="theme-toggle"
              onClick={toggleTheme}
              aria-label="테마 전환"
            >
              {theme === 'light' ? '🌙' : '☀️'}
            </button>
            {isAuthenticated ? (
              <>
                <Link to="/argu/create" className="btn btn-primary">
                  논쟁 작성
                </Link>
                <Link to="/my" className="btn btn-outline">
                  마이페이지
                </Link>
                <button onClick={handleLogout} className="btn btn-outline">
                  로그아웃
                </button>
              </>
            ) : (
              <>
                <Link to="/auth/login" className="btn btn-outline">
                  로그인
                </Link>
                <Link to="/auth/register" className="btn btn-primary">
                  회원가입
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header








