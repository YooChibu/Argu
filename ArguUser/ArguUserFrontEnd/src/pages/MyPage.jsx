/**
 * MyPage 컴포넌트
 * 
 * 현재 로그인한 사용자의 마이페이지입니다.
 * 목업 기반으로 재작성되었습니다.
 * 
 * 주요 기능:
 * - 대시보드: 통계 요약, 인기 논쟁 TOP 3, 최근 활동
 * - 내 논쟁: 작성한 논쟁 목록
 * - 참여한 논쟁: 입장을 선택한 논쟁 목록
 * - 내 댓글: 작성한 댓글 목록
 * - 북마크: 북마크한 논쟁 목록 (준비 중)
 * - 활동 내역: 최근 활동 내역 (준비 중)
 * 
 * 참고: ProtectedRoute로 보호되어 있어 로그인한 사용자만 접근 가능합니다.
 */

import { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import { userService } from '../services/userService'
import { myPageService } from '../services/myPageService'
import { Link } from 'react-router-dom'
import './MyPage.css'

const MyPage = () => {
  const { user } = useAuth()

  // 상태 관리
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('dashboard')
  const [myArgus, setMyArgus] = useState([])
  const [participatedArgus, setParticipatedArgus] = useState([])
  const [myComments, setMyComments] = useState([])
  const [loadingData, setLoadingData] = useState(false)

  // 초기 로딩
  useEffect(() => {
    if (user) {
      fetchProfile()
      fetchMyArgus() // 대시보드용
    }
  }, [user])

  /**
   * 프로필 정보 가져오기
   */
  const fetchProfile = async () => {
    try {
      const response = await userService.getUserById(user.id)
      const data = response.data || response
      setProfile(data)
    } catch (error) {
      console.error('프로필 로딩 실패:', error)
    } finally {
      setLoading(false)
    }
  }

  /**
   * 내 논쟁 목록 가져오기
   */
  const fetchMyArgus = async () => {
    if (!user) return
    setLoadingData(true)
    try {
      const response = await myPageService.getMyArgus(0, 100)
      const pageData = response.data || response
      const content = pageData.content || []
      setMyArgus(Array.isArray(content) ? content : [])
    } catch (error) {
      console.error('내 논쟁 목록 로딩 실패:', error)
      setMyArgus([])
    } finally {
      setLoadingData(false)
    }
  }

  /**
   * 참여한 논쟁 목록 가져오기
   */
  const fetchParticipatedArgus = async () => {
    if (!user) return
    setLoadingData(true)
    try {
      const response = await myPageService.getMyOpinions()
      const data = response.data || response
      const opinions = Array.isArray(data) ? data : []
      
      // ArguOpinion에서 논쟁 정보 추출
      const argus = opinions.map(opinion => ({
        id: opinion.argu?.id,
        title: opinion.argu?.title,
        categoryName: opinion.argu?.category?.name,
        status: opinion.argu?.status,
        side: opinion.side,
        createdAt: opinion.createdAt
      })).filter(argu => argu.id) // 논쟁 정보가 있는 것만
      
      setParticipatedArgus(argus)
    } catch (error) {
      console.error('참여한 논쟁 목록 로딩 실패:', error)
      setParticipatedArgus([])
    } finally {
      setLoadingData(false)
    }
  }

  /**
   * 내 댓글 목록 가져오기
   */
  const fetchMyComments = async () => {
    if (!user) return
    setLoadingData(true)
    try {
      const response = await myPageService.getMyComments(0, 100)
      const pageData = response.data || response
      const content = pageData.content || []
      setMyComments(Array.isArray(content) ? content : [])
    } catch (error) {
      console.error('내 댓글 목록 로딩 실패:', error)
      setMyComments([])
    } finally {
      setLoadingData(false)
    }
  }

  /**
   * 탭 변경 핸들러
   */
  const handleTabChange = (tab) => {
    setActiveTab(tab)
    
    // 탭에 따라 데이터 로딩
    if (tab === 'my-argu') {
      fetchMyArgus()
    } else if (tab === 'participated') {
      fetchParticipatedArgus()
    } else if (tab === 'comments') {
      fetchMyComments()
    }
  }

  /**
   * 시간 포맷팅 (상대 시간)
   */
  const formatRelativeTime = (dateString) => {
    if (!dateString) return ''
    const date = new Date(dateString)
    const now = new Date()
    const diff = now - date
    const minutes = Math.floor(diff / 60000)
    const hours = Math.floor(diff / 3600000)
    const days = Math.floor(diff / 86400000)

    if (minutes < 1) return '방금 전'
    if (minutes < 60) return `${minutes}분 전`
    if (hours < 24) return `${hours}시간 전`
    if (days < 7) return `${days}일 전`
    return date.toLocaleDateString('ko-KR')
  }

  /**
   * 입장 표시 변환
   */
  const getSideLabel = (side) => {
    switch (side) {
      case 'FOR': return '찬성'
      case 'AGAINST': return '반대'
      case 'NEUTRAL': return '중립'
      case 'OTHER': return '기타'
      default: return side
    }
  }

  if (loading) {
    return <div className="container">로딩 중...</div>
  }

  return (
    <div className="my-page">
      <div className="container">
        <div className="my-page-layout">
          {/* 사이드바 */}
          <aside className="my-page-sidebar">
            {profile && (
              <>
                <div className="profile-card">
                  <div className="profile-avatar">
                    {profile.profileImage ? (
                      <img src={profile.profileImage} alt={profile.nickname} />
                    ) : (
                      '👤'
                    )}
                  </div>
                  <h2 className="profile-name">{profile.nickname || '이름 없음'}</h2>
                  {profile.bio && <p className="profile-bio">{profile.bio}</p>}
                  <div className="profile-stats">
                    <div className="stat-item">
                      <span className="stat-value">{profile.arguCount ?? 0}</span>
                      <span className="stat-label">작성한 논쟁</span>
                    </div>
                    <div className="stat-item">
                      <span className="stat-value">{profile.participatedCount ?? 0}</span>
                      <span className="stat-label">참여한 논쟁</span>
                    </div>
                    <div className="stat-item">
                      <span className="stat-value">{profile.likeCount ?? 0}</span>
                      <span className="stat-label">받은 좋아요</span>
                    </div>
                  </div>
                  <div className="profile-actions">
                    <Link 
                      to="/my/edit" 
                      className="btn btn-outline" 
                      style={{ width: '100%' }}
                    >
                      프로필 수정
                    </Link>
                    <Link 
                      to="/my/settings" 
                      className="btn btn-outline" 
                      style={{ width: '100%', marginTop: '0.5rem' }}
                    >
                      계정 설정
                    </Link>
                  </div>
                </div>

                <nav className="my-page-nav">
                  <button 
                    onClick={() => handleTabChange('dashboard')} 
                    className={`nav-item ${activeTab === 'dashboard' ? 'active' : ''}`}
                  >
                    대시보드
                  </button>
                  <button 
                    onClick={() => handleTabChange('my-argu')} 
                    className={`nav-item ${activeTab === 'my-argu' ? 'active' : ''}`}
                  >
                    내 논쟁
                  </button>
                  <button 
                    onClick={() => handleTabChange('participated')} 
                    className={`nav-item ${activeTab === 'participated' ? 'active' : ''}`}
                  >
                    참여한 논쟁
                  </button>
                  <button 
                    onClick={() => handleTabChange('comments')} 
                    className={`nav-item ${activeTab === 'comments' ? 'active' : ''}`}
                  >
                    내 댓글
                  </button>
                  <button 
                    onClick={() => handleTabChange('bookmarks')} 
                    className={`nav-item ${activeTab === 'bookmarks' ? 'active' : ''}`}
                  >
                    북마크
                  </button>
                  <button 
                    onClick={() => handleTabChange('activity')} 
                    className={`nav-item ${activeTab === 'activity' ? 'active' : ''}`}
                  >
                    활동 내역
                  </button>
                </nav>
              </>
            )}
          </aside>

          {/* 메인 컨텐츠 */}
          <div className="my-page-content">
            {/* 대시보드 탭 */}
            {activeTab === 'dashboard' && (
              <>
                <div className="page-header">
                  <h1>대시보드</h1>
                </div>

                {/* 통계 요약 */}
                {profile && (
                  <div className="stats-grid">
                    <div className="stat-card">
                      <div className="stat-icon">📝</div>
                      <div className="stat-info">
                        <div className="stat-number">{profile.arguCount ?? 0}</div>
                        <div className="stat-label">작성한 논쟁</div>
                      </div>
                    </div>
                    <div className="stat-card">
                      <div className="stat-icon">💬</div>
                      <div className="stat-info">
                        <div className="stat-number">{profile.commentCount ?? 0}</div>
                        <div className="stat-label">작성한 댓글</div>
                      </div>
                    </div>
                    <div className="stat-card">
                      <div className="stat-icon">👍</div>
                      <div className="stat-info">
                        <div className="stat-number">{profile.likeCount ?? 0}</div>
                        <div className="stat-label">받은 좋아요</div>
                      </div>
                    </div>
                    <div className="stat-card">
                      <div className="stat-icon">🏆</div>
                      <div className="stat-info">
                        <div className="stat-number">{profile.participatedCount ?? 0}</div>
                        <div className="stat-label">참여한 논쟁</div>
                      </div>
                    </div>
                  </div>
                )}

                {/* 인기 논쟁 TOP 3 */}
                <section className="section">
                  <h2>내 인기 논쟁 TOP 3</h2>
                  <div className="my-argu-list">
                    {loadingData ? (
                      <p>로딩 중...</p>
                    ) : myArgus.length > 0 ? (
                      myArgus
                        .sort((a, b) => (b.likeCount || 0) - (a.likeCount || 0))
                        .slice(0, 3)
                        .map((argu) => (
                          <div key={argu.id} className="my-argu-item">
                            <div className="argu-item-header">
                              <span className="category-badge">{argu.categoryName}</span>
                              <span className={`status-badge status-${argu.status?.toLowerCase()}`}>
                                {argu.status === 'ACTIVE' ? '진행중' : argu.status === 'ENDED' ? '종료' : '예정'}
                              </span>
                            </div>
                            <h3>
                              <Link to={`/argu/${argu.id}`}>{argu.title}</Link>
                            </h3>
                            <div className="argu-item-meta">
                              <span className="stat">
                                👍 {argu.likeCount || 0} | 💬 {argu.commentCount || 0} | 👁️ {argu.viewCount || 0}
                              </span>
                              <span className="date">
                                {new Date(argu.createdAt).toLocaleDateString('ko-KR')}
                              </span>
                            </div>
                          </div>
                        ))
                    ) : (
                      <p style={{ color: 'var(--text-secondary)' }}>아직 작성한 논쟁이 없습니다.</p>
                    )}
                  </div>
                </section>

                {/* 최근 활동 */}
                <section className="section">
                  <h2>최근 활동</h2>
                  <div className="activity-list">
                    {myComments.length > 0 ? (
                      myComments.slice(0, 5).map((comment) => (
                        <div key={comment.id} className="activity-item">
                          <div className="activity-icon">💬</div>
                          <div className="activity-content">
                            <p>
                              <strong>{profile.nickname}</strong>님이
                              <Link to={`/argu/${comment.arguId}`}> 논쟁</Link>에 댓글을 작성했습니다.
                            </p>
                            <span className="activity-time">{formatRelativeTime(comment.createdAt)}</span>
                          </div>
                        </div>
                      ))
                    ) : (
                      <p style={{ color: 'var(--text-secondary)' }}>최근 활동이 없습니다.</p>
                    )}
                  </div>
                </section>
              </>
            )}

            {/* 내 논쟁 탭 */}
            {activeTab === 'my-argu' && (
              <>
                <div className="page-header">
                  <h1>내 논쟁</h1>
                </div>
                {loadingData ? (
                  <p>로딩 중...</p>
                ) : myArgus.length > 0 ? (
                  <div className="my-argu-list">
                    {myArgus.map((argu) => (
                      <div key={argu.id} className="my-argu-item">
                        <div className="argu-item-header">
                          <span className="category-badge">{argu.categoryName}</span>
                          <span className={`status-badge status-${argu.status?.toLowerCase()}`}>
                            {argu.status === 'ACTIVE' ? '진행중' : argu.status === 'ENDED' ? '종료' : '예정'}
                          </span>
                        </div>
                        <h3>
                          <Link to={`/argu/${argu.id}`}>{argu.title}</Link>
                        </h3>
                        <div className="argu-item-meta">
                          <span className="stat">
                            👍 {argu.likeCount || 0} | 💬 {argu.commentCount || 0} | 👁️ {argu.viewCount || 0}
                          </span>
                          <span className="date">
                            {new Date(argu.createdAt).toLocaleDateString('ko-KR')}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p style={{ color: 'var(--text-secondary)' }}>작성한 논쟁이 없습니다.</p>
                )}
              </>
            )}

            {/* 참여한 논쟁 탭 */}
            {activeTab === 'participated' && (
              <>
                <div className="page-header">
                  <h1>참여한 논쟁</h1>
                </div>
                {loadingData ? (
                  <p>로딩 중...</p>
                ) : participatedArgus.length > 0 ? (
                  <div className="my-argu-list">
                    {participatedArgus.map((argu, index) => (
                      <div key={argu.id || index} className="my-argu-item">
                        <div className="argu-item-header">
                          <span className="category-badge">{argu.categoryName || '카테고리'}</span>
                          <span className={`status-badge status-${argu.status?.toLowerCase() || 'active'}`}>
                            {argu.status === 'ACTIVE' ? '진행중' : argu.status === 'ENDED' ? '종료' : '예정'}
                          </span>
                          {argu.side && (
                            <span className={`side-badge side-${argu.side.toLowerCase()}`}>
                              {getSideLabel(argu.side)}
                            </span>
                          )}
                        </div>
                        <h3>
                          <Link to={`/argu/${argu.id}`}>{argu.title}</Link>
                        </h3>
                        <div className="argu-item-meta">
                          <span className="date">
                            {argu.createdAt ? new Date(argu.createdAt).toLocaleDateString('ko-KR') : ''}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p style={{ color: 'var(--text-secondary)' }}>참여한 논쟁이 없습니다.</p>
                )}
              </>
            )}

            {/* 내 댓글 탭 */}
            {activeTab === 'comments' && (
              <>
                <div className="page-header">
                  <h1>내 댓글</h1>
                </div>
                {loadingData ? (
                  <p>로딩 중...</p>
                ) : myComments.length > 0 ? (
                  <div className="activity-list">
                    {myComments.map((comment) => (
                      <div key={comment.id} className="activity-item">
                        <div className="activity-icon">💬</div>
                        <div className="activity-content">
                          <p>
                            <Link to={`/argu/${comment.arguId}`}>
                              {comment.content}
                            </Link>
                          </p>
                          <span className="activity-time">
                            {new Date(comment.createdAt).toLocaleString('ko-KR')}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p style={{ color: 'var(--text-secondary)' }}>작성한 댓글이 없습니다.</p>
                )}
              </>
            )}

            {/* 북마크 탭 */}
            {activeTab === 'bookmarks' && (
              <>
                <div className="page-header">
                  <h1>북마크</h1>
                </div>
                <p style={{ color: 'var(--text-secondary)' }}>북마크 기능은 준비 중입니다.</p>
              </>
            )}

            {/* 활동 내역 탭 */}
            {activeTab === 'activity' && (
              <>
                <div className="page-header">
                  <h1>활동 내역</h1>
                </div>
                <p style={{ color: 'var(--text-secondary)' }}>활동 내역 기능은 준비 중입니다.</p>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default MyPage
