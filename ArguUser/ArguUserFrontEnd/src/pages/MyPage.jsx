/**
 * MyPage 컴포넌트
 * 
 * 현재 로그인한 사용자의 마이페이지입니다.
 * 
 * 주요 기능:
 * - 사용자 프로필 정보 표시
 * - 사용자 통계 정보 표시 (작성한 논쟁, 참여한 논쟁, 받은 좋아요)
 * 
 * 참고: ProtectedRoute로 보호되어 있어 로그인한 사용자만 접근 가능합니다.
 */

import { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import { userService } from '../services/userService'
import './MyPage.css'

/**
 * MyPage 컴포넌트
 * 
 * @returns {JSX.Element} 마이페이지 컴포넌트
 */
const MyPage = () => {
  // 훅 사용
  const { user } = useAuth() // 현재 로그인한 사용자 정보

  // 상태 관리
  const [profile, setProfile] = useState(null) // 사용자 프로필 정보
  const [loading, setLoading] = useState(true) // 로딩 상태

  /**
   * 사용자 정보 변경 시 프로필 로딩
   */
  useEffect(() => {
    if (user) {
      fetchProfile()
    }
  }, [user])

  /**
   * 프로필 정보 가져오기
   * 
   * 현재 로그인한 사용자의 상세 프로필 정보를 가져옵니다.
   */
  const fetchProfile = async () => {
    try {
      const response = await userService.getUserById(user.id)
      // ApiResponse 구조에서 data 추출
      const data = response.data || response
      setProfile(data)
    } catch (error) {
      console.error('프로필 로딩 실패:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return <div className="container">로딩 중...</div>
  }

  return (
    <div className="my-page">
      <div className="container">
        <h1>마이페이지</h1>
        {profile && (
          <div className="profile-section">
            <div className="profile-header">
              <div className="profile-avatar">👤</div>
              <div className="profile-info">
                <h2>{profile.nickname || profile.username}</h2>
                <p>@{profile.username}</p>
                {profile.bio && <p className="profile-bio">{profile.bio}</p>}
              </div>
            </div>
            <div className="profile-stats">
              <div className="stat-card">
                <div className="stat-value">-</div>
                <div className="stat-label">작성한 논쟁</div>
              </div>
              <div className="stat-card">
                <div className="stat-value">-</div>
                <div className="stat-label">참여한 논쟁</div>
              </div>
              <div className="stat-card">
                <div className="stat-value">-</div>
                <div className="stat-label">받은 좋아요</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default MyPage

