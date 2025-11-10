/**
 * LoginPage 컴포넌트
 * 
 * 사용자 로그인 페이지입니다.
 * 
 * 주요 기능:
 * - 이메일 또는 아이디로 로그인
 * - 비밀번호 입력
 * - 로그인 실패 시 에러 메시지 표시
 * - 로그인 성공 시 메인 페이지로 이동
 */

import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import './Auth.css'

/**
 * LoginPage 컴포넌트
 * 
 * @returns {JSX.Element} 로그인 페이지 컴포넌트
 */
const LoginPage = () => {
  // 훅 사용
  const navigate = useNavigate() // 페이지 네비게이션
  const { login } = useAuth() // 로그인 함수

  // 상태 관리
  const [formData, setFormData] = useState({
    emailOrUsername: '', // 이메일 또는 아이디
    password: '', // 비밀번호
  })
  const [error, setError] = useState('') // 에러 메시지
  const [loading, setLoading] = useState(false) // 로딩 상태

  /**
   * 폼 제출 처리 함수
   * 
   * 로그인 요청을 보내고 성공 시 메인 페이지로 이동합니다.
   * 
   * @param {Event} e - 폼 제출 이벤트
   */
  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      // 로그인 요청
      await login(formData.emailOrUsername, formData.password)
      // 로그인 성공 시 메인 페이지로 이동
      navigate('/')
    } catch (error) {
      // 에러 메시지 표시
      setError(error.response?.data?.message || '로그인에 실패했습니다.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="auth-page">
      <div className="auth-container">
        <h1>로그인</h1>
        <form onSubmit={handleSubmit} className="auth-form">
          {error && <div className="error-message">{error}</div>}
          <div className="form-group">
            <label htmlFor="emailOrUsername">이메일 또는 아이디</label>
            <input
              type="text"
              id="emailOrUsername"
              value={formData.emailOrUsername}
              onChange={(e) =>
                setFormData({ ...formData, emailOrUsername: e.target.value })
              }
              required
              className="form-input"
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">비밀번호</label>
            <input
              type="password"
              id="password"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              required
              className="form-input"
            />
          </div>
          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? '로그인 중...' : '로그인'}
          </button>
        </form>
        <div className="auth-links">
          <Link to="/auth/register">회원가입</Link>
          <Link to="/auth/forgot-password">비밀번호 찾기</Link>
        </div>
      </div>
    </div>
  )
}

export default LoginPage








