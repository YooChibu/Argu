/**
 * RegisterPage 컴포넌트
 * 
 * 사용자 회원가입 페이지입니다.
 * 
 * 주요 기능:
 * - 이메일, 닉네임, 비밀번호 입력
 * - 비밀번호 확인
 * - 비밀번호 일치 검증
 * - 회원가입 성공 시 자동 로그인 및 메인 페이지로 이동
 */

import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import './Auth.css'

/**
 * RegisterPage 컴포넌트
 * 
 * @returns {JSX.Element} 회원가입 페이지 컴포넌트
 */
const RegisterPage = () => {
  // 훅 사용
  const navigate = useNavigate() // 페이지 네비게이션
  const { register } = useAuth() // 회원가입 함수

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  const emailRuleMessage = '올바른 이메일 형식(예: user@example.com)을 입력해주세요.'
  const nicknamePattern = /^.{2,}$/
  const nicknameRuleMessage = '닉네임은 2자 이상 입력해야 합니다.'
  const passwordPattern =
    /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*()_+\-={}|:;'"<>,.?/]).{8,}$/
  const passwordRuleMessage =
    '비밀번호는 대문자, 소문자, 숫자, 특수문자를 각각 1개 이상 포함해야 합니다.'

  // 상태 관리
  const [formData, setFormData] = useState({
    email: '', // 이메일
    password: '', // 비밀번호
    passwordConfirm: '', // 비밀번호 확인
    nickname: '', // 닉네임
    bio: '', // 자기소개 (선택)
  })
  const [error, setError] = useState('') // 에러 메시지
  const [loading, setLoading] = useState(false) // 로딩 상태
  const [emailPatternError, setEmailPatternError] = useState('') // 이메일 패턴 에러
  const [nicknamePatternError, setNicknamePatternError] = useState('') // 닉네임 패턴 에러
  const [passwordPatternError, setPasswordPatternError] = useState('') // 비밀번호 패턴 에러
  const [passwordConfirmError, setPasswordConfirmError] = useState('') // 비밀번호 확인 에러

  /**
   * 폼 제출 처리 함수
   * 
   * 회원가입 요청을 보내고 성공 시 메인 페이지로 이동합니다.
   * 
   * @param {Event} e - 폼 제출 이벤트
   */
  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    if (!emailPattern.test(formData.email)) {
      setError(emailRuleMessage)
      setEmailPatternError(emailRuleMessage)
      return
    }

    if (!nicknamePattern.test(formData.nickname)) {
      setError(nicknameRuleMessage)
      setNicknamePatternError(nicknameRuleMessage)
      return
    }

    // 비밀번호 일치 검증
    if (formData.password !== formData.passwordConfirm) {
      setError('비밀번호가 일치하지 않습니다.')
      setPasswordConfirmError('비밀번호가 일치하지 않습니다.')
      return
    }

    if (!passwordPattern.test(formData.password)) {
      setError(passwordRuleMessage)
      setPasswordPatternError(passwordRuleMessage)
      return
    }

    setLoading(true)

    try {
      // 회원가입 요청 (성공 시 자동으로 로그인됨)
      await register({
        email: formData.email,
        password: formData.password,
        nickname: formData.nickname,
        bio: formData.bio || undefined,
      })
      // 회원가입 성공 시 메인 페이지로 이동
      navigate('/')
    } catch (error) {
      // 에러 메시지 표시
      setError(error.response?.data?.message || '회원가입에 실패했습니다.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="auth-page">
      <div className="auth-container">
        <h1>회원가입</h1>
        <form onSubmit={handleSubmit} className="auth-form">
          {error && <div className="error-message">{error}</div>}
          <div className="form-group">
            <label htmlFor="email">이메일</label>
            <input
              type="email"
              id="email"
              value={formData.email}
              onChange={(e) => {
                const value = e.target.value
                setFormData({ ...formData, email: value })
                if (error) {
                  setError('')
                }

                if (!value) {
                  setEmailPatternError('')
                  return
                }

                if (!emailPattern.test(value)) {
                  setEmailPatternError(emailRuleMessage)
                } else {
                  setEmailPatternError('')
                }
              }}
              required
              className="form-input"
            />
            {emailPatternError && (
              <small className="field-error">{emailPatternError}</small>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="nickname">닉네임</label>
            <input
              type="text"
              id="nickname"
              value={formData.nickname}
              onChange={(e) => {
                const value = e.target.value
                setFormData({ ...formData, nickname: value })
                if (error) {
                  setError('')
                }

                if (!value) {
                  setNicknamePatternError('')
                  return
                }

                if (!nicknamePattern.test(value)) {
                  setNicknamePatternError(nicknameRuleMessage)
                } else {
                  setNicknamePatternError('')
                }
              }}
              required
              className="form-input"
            />
            {nicknamePatternError && (
              <small className="field-error">{nicknamePatternError}</small>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="password">비밀번호</label>
            <input
              type="password"
              id="password"
              value={formData.password}
              onChange={(e) => {
                const value = e.target.value
                setFormData({ ...formData, password: value })
                if (error) {
                  setError('')
                }

                if (!value) {
                  setPasswordPatternError('')
                  setPasswordConfirmError(
                    formData.passwordConfirm ? '비밀번호가 일치하지 않습니다.' : ''
                  )
                  return
                }

                if (!passwordPattern.test(value)) {
                  setPasswordPatternError(passwordRuleMessage)
                } else {
                  setPasswordPatternError('')
                }

                if (formData.passwordConfirm) {
                  if (value !== formData.passwordConfirm) {
                    setPasswordConfirmError('비밀번호가 일치하지 않습니다.')
                  } else {
                    setPasswordConfirmError('')
                  }
                }
              }}
              required
              className="form-input"
            />
            
            {passwordPatternError && (
              <small className="field-error">{passwordPatternError}</small>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="passwordConfirm">비밀번호 확인</label>
            <input
              type="password"
              id="passwordConfirm"
              value={formData.passwordConfirm}
              onChange={(e) => {
                const value = e.target.value
                setFormData({ ...formData, passwordConfirm: value })
                if (error) {
                  setError('')
                }

                if (!value) {
                  setPasswordConfirmError('')
                  return
                }

                if (value !== formData.password) {
                  setPasswordConfirmError('비밀번호가 일치하지 않습니다.')
                } else {
                  setPasswordConfirmError('')
                }
              }}
              required
              className="form-input"
            />
            {passwordConfirmError && (
              <small className="field-error">{passwordConfirmError}</small>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="bio">
              자기소개 <span className="optional-label">(선택)</span>
            </label>
            <textarea
              id="bio"
              value={formData.bio}
              onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
              className="form-textarea"
              maxLength={500}
              placeholder="자기소개를 입력하세요 (최대 500자)"
            />
            <small className="helper-text">최대 500자까지 입력할 수 있습니다.</small>
          </div>
          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? '가입 중...' : '회원가입'}
          </button>
        </form>
        <div className="auth-links">
          <Link to="/auth/login">이미 계정이 있으신가요? 로그인</Link>
        </div>
      </div>
    </div>
  )
}

export default RegisterPage








