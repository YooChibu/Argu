/**
 * 관리자 레이아웃 컴포넌트
 * 
 * 관리자 페이지의 공통 레이아웃을 제공합니다.
 * 사이드바와 헤더를 포함합니다.
 */

import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { useTheme } from '../../context/ThemeContext'
import './AdminLayout.css'

const AdminLayout = ({ children }) => {
  const location = useLocation()
  const navigate = useNavigate()
  const { admin, logout } = useAuth()
  const { theme, toggleTheme } = useTheme()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  const isActive = (path) => {
    return location.pathname === path
  }

  const menuItems = [
    { path: '/', label: '대시보드', icon: '📊' },
    { path: '/users', label: '회원 관리', icon: '👥' },
    { path: '/argu', label: '논쟁 관리', icon: '💬' },
    { path: '/comments', label: '댓글 관리', icon: '💭' },
    { path: '/categories', label: '카테고리 관리', icon: '📂' },
    { path: '/reports', label: '신고 관리', icon: '🚨' },
    { path: '/statistics', label: '통계 및 분석', icon: '📈' },
    { path: '/settings', label: '시스템 설정', icon: '⚙️' },
    { path: '/admins', label: '관리자 관리', icon: '👤' }
  ]

  return (
    <div className="admin-layout">
      {/* 사이드바 */}
      <aside className="admin-sidebar">
        <div className="admin-logo">
          <Link to="/">
            <span className="logo-text">Argu Admin</span>
          </Link>
        </div>
        <nav className="admin-nav">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`nav-item ${isActive(item.path) ? 'active' : ''}`}
            >
              <span>{item.icon}</span>
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="admin-footer">
          <div className="admin-user">
            <div className="admin-avatar">👤</div>
            <div className="admin-info">
              <div className="admin-name">{admin?.name || '관리자'}</div>
              <div className="admin-role">
                {admin?.role === 'SUPER_ADMIN' ? '슈퍼 관리자' : '일반 관리자'}
              </div>
            </div>
          </div>
          <button onClick={handleLogout} className="logout-btn">
            로그아웃
          </button>
        </div>
      </aside>

      {/* 메인 컨텐츠 */}
      <main className="admin-main">
        <header className="admin-header">
          <h2>
            {menuItems.find(item => isActive(item.path))?.label || '대시보드'}
          </h2>
          <div className="admin-header-actions">
            <button
              onClick={toggleTheme}
              className="theme-toggle"
              aria-label="테마 전환"
            >
              {theme === 'light' ? '🌙' : '☀️'}
            </button>
            <span className="current-time">
              {new Date().toLocaleString('ko-KR')}
            </span>
          </div>
        </header>
        <div className="admin-content">{children}</div>
      </main>
    </div>
  )
}

export default AdminLayout

