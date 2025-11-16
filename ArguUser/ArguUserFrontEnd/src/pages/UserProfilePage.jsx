/**
 * UserProfilePage 컴포넌트
 * 
 * 특정 사용자의 프로필 페이지입니다.
 * 
 * 주요 기능:
 * - 사용자 프로필 정보 표시
 * - 사용자 통계 정보 표시 (향후 확장 가능)
 */

import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { userService } from '../services/userService'
import './UserProfilePage.css'

/**
 * UserProfilePage 컴포넌트
 * 
 * @returns {JSX.Element} 사용자 프로필 페이지 컴포넌트
 */
const UserProfilePage = () => {
  // 훅 사용
  const { userId } = useParams() // URL 파라미터에서 사용자 ID 가져오기

  // 상태 관리
  const [profile, setProfile] = useState(null) // 사용자 프로필 정보
  const [loading, setLoading] = useState(true) // 로딩 상태

  /**
   * 사용자 아이디 변경 시 프로필 로딩
   */
  useEffect(() => {
    fetchProfile()
  }, [userId])

  /**
   * 프로필 정보 가져오기
   * 
   * 사용자 아이디로 사용자의 프로필 정보를 가져옵니다.
   */
  const fetchProfile = async () => {
    try {
      const response = await userService.getUserById(userId)
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

  if (!profile) {
    return <div className="container">사용자를 찾을 수 없습니다.</div>
  }

  return (
    <div className="user-profile-page">
      <div className="container">
        <div className="profile-section">
          <div className="profile-header">
            <div className="profile-avatar">👤</div>
            <div className="profile-info">
              <h1>{profile.nickname || '이름 없음'}</h1>
              <p>{profile.email}</p>
              {profile.bio && <p className="profile-bio">{profile.bio}</p>}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserProfilePage

