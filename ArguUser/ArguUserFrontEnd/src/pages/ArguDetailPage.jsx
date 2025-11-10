import { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { arguService } from '../services/arguService'
import { commentService } from '../services/commentService'
import { opinionService } from '../services/opinionService'
import { likeService } from '../services/likeService'
import { format } from 'date-fns'
import './ArguDetailPage.css'

const ArguDetailPage = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { user, isAuthenticated } = useAuth()
  const [argu, setArgu] = useState(null)
  const [comments, setComments] = useState([])
  const [opinions, setOpinions] = useState([])
  const [isLiked, setIsLiked] = useState(false)
  const [loading, setLoading] = useState(true)
  const [commentContent, setCommentContent] = useState('')
  const [selectedSide, setSelectedSide] = useState(null)
  const [opinionContent, setOpinionContent] = useState('')

  useEffect(() => {
    fetchData()
  }, [id])

  const fetchData = async () => {
    try {
      setLoading(true)
      const [arguResponse, commentsResponse, opinionsResponse] = await Promise.all([
        arguService.getArguById(id),
        commentService.getCommentsByArgu(id),
        opinionService.getOpinionsByArgu(id),
      ])

      // ApiResponse 구조에서 data 추출
      setArgu(arguResponse.data || arguResponse)
      setComments((commentsResponse.data || commentsResponse)?.content || [])
      setOpinions((opinionsResponse.data || opinionsResponse) || [])

      if (isAuthenticated) {
        const liked = await likeService.isLiked(id)
        setIsLiked(liked)
      }
    } catch (error) {
      console.error('데이터 로딩 실패:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleLike = async () => {
    if (!isAuthenticated) {
      navigate('/auth/login')
      return
    }

    try {
      await likeService.toggleLike(id)
      setIsLiked(!isLiked)
      fetchData()
    } catch (error) {
      console.error('좋아요 처리 실패:', error)
    }
  }

  const handleCreateComment = async (e) => {
    e.preventDefault()
    if (!isAuthenticated) {
      navigate('/auth/login')
      return
    }

    try {
      await commentService.createComment({
        arguId: parseInt(id),
        content: commentContent,
      })
      setCommentContent('')
      fetchData()
    } catch (error) {
      console.error('댓글 작성 실패:', error)
    }
  }

  const handleCreateOpinion = async (side) => {
    if (!isAuthenticated) {
      navigate('/auth/login')
      return
    }

    try {
      await opinionService.createOpinion({
        arguId: parseInt(id),
        side,
        content: opinionContent || null,
      })
      setSelectedSide(null)
      setOpinionContent('')
      fetchData()
    } catch (error) {
      console.error('입장 선택 실패:', error)
    }
  }

  const handleDelete = async () => {
    if (!window.confirm('정말 삭제하시겠습니까?')) return

    try {
      await arguService.deleteArgu(id)
      navigate('/argu')
    } catch (error) {
      console.error('삭제 실패:', error)
    }
  }

  if (loading) {
    return <div className="container">로딩 중...</div>
  }

  if (!argu) {
    return <div className="container">논쟁을 찾을 수 없습니다.</div>
  }

  const isOwner = user && user.id === argu.user?.id
  const canEdit = isOwner && argu.status === 'SCHEDULED'
  const canVote = argu.status === 'ACTIVE' && isAuthenticated

  const forCount = opinions.filter((o) => o.side === 'FOR').length
  const againstCount = opinions.filter((o) => o.side === 'AGAINST').length
  const totalCount = forCount + againstCount
  const forPercent = totalCount > 0 ? Math.round((forCount / totalCount) * 100) : 0
  const againstPercent = totalCount > 0 ? Math.round((againstCount / totalCount) * 100) : 0

  return (
    <div className="argu-detail-page">
      <div className="container">
        {/* 논쟁 상세 정보 */}
        <article className="argu-detail">
          <div className="argu-detail-header">
            <div className="argu-meta-top">
              {argu.category && (
                <span className="category-badge">{argu.category.name}</span>
              )}
              <span className={`status-badge status-${argu.status?.toLowerCase()}`}>
                {argu.status === 'ACTIVE' ? '진행중' : argu.status === 'SCHEDULED' ? '예정' : '종료'}
              </span>
              <span className="period-badge">
                {format(new Date(argu.startDate), 'yyyy-MM-dd')} ~{' '}
                {format(new Date(argu.endDate), 'yyyy-MM-dd')}
              </span>
            </div>
            <h1 className="argu-detail-title">{argu.title}</h1>
            <div className="argu-author-info">
              <div className="author-avatar">👤</div>
              <div className="author-details">
                <Link to={`/users/${argu.user?.username}`} className="author-name">
                  {argu.user?.nickname || argu.user?.username}
                </Link>
                <span className="author-date">
                  {format(new Date(argu.createdAt), 'yyyy-MM-dd HH:mm')}
                </span>
              </div>
              {isOwner && (
                <div className="argu-actions">
                  {canEdit && (
                    <>
                      <Link to={`/argu/${id}/edit`} className="btn-icon">
                        ✏️ 수정
                      </Link>
                      <button onClick={handleDelete} className="btn-icon">
                        🗑️ 삭제
                      </button>
                    </>
                  )}
                </div>
              )}
            </div>
          </div>

          <div className="argu-detail-content">
            <p>{argu.content}</p>
          </div>

          <div className="argu-stats-detail">
            <div className="stat-item">
              <span className="stat-label">조회수</span>
              <span className="stat-value">{argu.viewCount || 0}</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">좋아요</span>
              <span className="stat-value">{argu.likeCount || 0}</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">댓글</span>
              <span className="stat-value">{argu.commentCount || 0}</span>
            </div>
          </div>

          <div className="argu-interactions">
            <button
              onClick={handleLike}
              className={`btn ${isLiked ? 'btn-primary' : 'btn-outline'}`}
            >
              👍 좋아요 ({argu.likeCount || 0})
            </button>
          </div>
        </article>

        {/* 투표 섹션 */}
        {canVote && (
          <section className="vote-section">
            <h2>당신의 입장을 선택하세요</h2>
            <div className="vote-options">
              <div className="vote-option vote-for-option">
                <h3>찬성</h3>
                <p>AI는 인간의 일자리를 대체할 것입니다.</p>
                <button
                  className="btn btn-primary"
                  style={{ width: '100%' }}
                  onClick={() => handleCreateOpinion('FOR')}
                >
                  찬성 선택
                </button>
                <div className="vote-result">
                  <div className="vote-bar">
                    <div
                      className="vote-bar-fill vote-for"
                      style={{ width: `${forPercent}%` }}
                    ></div>
                  </div>
                  <p className="vote-percentage">
                    {forPercent}% ({forCount}명)
                  </p>
                </div>
              </div>
              <div className="vote-option vote-against-option">
                <h3>반대</h3>
                <p>AI는 새로운 일자리를 창출할 것입니다.</p>
                <button
                  className="btn btn-danger"
                  style={{ width: '100%' }}
                  onClick={() => handleCreateOpinion('AGAINST')}
                >
                  반대 선택
                </button>
                <div className="vote-result">
                  <div className="vote-bar">
                    <div
                      className="vote-bar-fill vote-against"
                      style={{ width: `${againstPercent}%` }}
                    ></div>
                  </div>
                  <p className="vote-percentage">
                    {againstPercent}% ({againstCount}명)
                  </p>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* 댓글 섹션 */}
        <section className="comments-section">
          <div className="comments-header">
            <h2>댓글 ({argu.commentCount || 0})</h2>
          </div>

          {isAuthenticated && (
            <form onSubmit={handleCreateComment} className="comment-form">
              <textarea
                className="form-textarea"
                placeholder="댓글을 입력하세요..."
                value={commentContent}
                onChange={(e) => setCommentContent(e.target.value)}
                required
              />
              <div className="comment-form-actions">
                <button type="submit" className="btn btn-primary">
                  등록
                </button>
                <button
                  type="button"
                  onClick={() => setCommentContent('')}
                  className="btn btn-outline"
                >
                  취소
                </button>
              </div>
            </form>
          )}

          <div className="comments-list">
            {comments.map((comment) => (
              <div key={comment.id} className="comment-item">
                <div className="comment-header">
                  <div className="comment-author">
                    <div className="author-avatar-small">👤</div>
                    <div>
                      <Link
                        to={`/users/${comment.user?.username}`}
                        className="comment-author-name"
                      >
                        {comment.user?.nickname || comment.user?.username}
                      </Link>
                      <span className="comment-date">
                        {format(new Date(comment.createdAt), 'yyyy-MM-dd HH:mm')}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="comment-content">
                  <p>{comment.content}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}

export default ArguDetailPage

