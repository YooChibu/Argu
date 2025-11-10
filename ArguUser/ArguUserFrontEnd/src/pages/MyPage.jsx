import { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import { userService } from '../services/userService'
import './MyPage.css'

const MyPage = () => {
  const { user } = useAuth()
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (user) {
      fetchProfile()
    }
  }, [user])

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

