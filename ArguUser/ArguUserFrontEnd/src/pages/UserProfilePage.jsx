import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { userService } from '../services/userService'
import './UserProfilePage.css'

const UserProfilePage = () => {
  const { username } = useParams()
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchProfile()
  }, [username])

  const fetchProfile = async () => {
    try {
      const response = await userService.getUserByUsername(username)
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
              <h1>{profile.nickname || profile.username}</h1>
              <p>@{profile.username}</p>
              {profile.bio && <p className="profile-bio">{profile.bio}</p>}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserProfilePage

