/**
 * ProtectedRoute 컴포넌트
 * 
 * 인증이 필요한 페이지를 보호하는 컴포넌트입니다.
 * 로그인하지 않은 사용자가 접근하려고 하면 로그인 페이지로 리다이렉트합니다.
 * 
 * 사용 예시:
 * <Route path="/my" element={<ProtectedRoute><MyPage /></ProtectedRoute>} />
 */

import { Navigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

/**
 * ProtectedRoute 컴포넌트
 * 
 * @param {Object} props - 컴포넌트 props
 * @param {React.ReactNode} props.children - 보호할 자식 컴포넌트
 * @returns {JSX.Element} 인증된 경우 자식 컴포넌트, 미인증 시 로그인 페이지로 리다이렉트
 */
const ProtectedRoute = ({ children }) => {
  // 인증 상태 및 로딩 상태 가져오기
  const { isAuthenticated, loading } = useAuth()

  // 로딩 중이면 로딩 메시지 표시
  if (loading) {
    return <div className="container">로딩 중...</div>
  }

  // 인증되지 않은 경우 로그인 페이지로 리다이렉트
  if (!isAuthenticated) {
    return <Navigate to="/auth/login" replace />
  }

  // 인증된 경우 자식 컴포넌트 렌더링
  return children
}

export default ProtectedRoute








