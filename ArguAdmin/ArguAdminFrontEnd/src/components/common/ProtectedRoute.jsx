/**
 * ProtectedRoute 컴포넌트
 * 
 * 인증이 필요한 관리자 페이지를 보호하는 컴포넌트입니다.
 */

import { Navigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth()

  if (loading) {
    return <div className="admin-loading">로딩 중...</div>
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  return children
}

export default ProtectedRoute

