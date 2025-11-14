/**
 * ArguCard 컴포넌트
 * 
 * 논쟁 목록에서 각 논쟁을 카드 형태로 표시하는 컴포넌트입니다.
 * 
 * 주요 기능:
 * - 논쟁 제목, 내용 미리보기
 * - 카테고리 및 상태 배지 표시
 * - 작성자 정보 및 작성일 표시
 * - 통계 정보 표시 (좋아요, 댓글, 조회수)
 */

import { Link, useNavigate } from 'react-router-dom'
import { format } from 'date-fns'
import './ArguCard.css'

/**
 * ArguCard 컴포넌트
 * 
 * @param {Object} props - 컴포넌트 props
 * @param {Object} props.argu - 논쟁 데이터 객체
 * @param {number} props.argu.id - 논쟁 ID
 * @param {string} props.argu.title - 논쟁 제목
 * @param {string} props.argu.content - 논쟁 내용
 * @param {string} props.argu.status - 논쟁 상태 (SCHEDULED, ACTIVE, ENDED)
 * @param {string} props.argu.categoryName - 카테고리 이름
 * @param {number} props.argu.userId - 작성자 ID
 * @param {string} props.argu.nickname - 작성자 닉네임
 * @param {number} props.argu.likeCount - 좋아요 수
 * @param {number} props.argu.commentCount - 댓글 수
 * @param {number} props.argu.viewCount - 조회수
 * @param {string} props.argu.createdAt - 생성일시
 * @returns {JSX.Element} 논쟁 카드 컴포넌트
 */
const ArguCard = ({ argu }) => {
  const navigate = useNavigate()

  /**
   * HTML 태그를 제거하고 순수 텍스트만 추출하는 함수
   * 
   * @param {string} html - HTML 문자열
   * @returns {string} 순수 텍스트
   */
  const stripHtml = (html) => {
    if (!html) return ''
    const tmp = document.createElement('DIV')
    tmp.innerHTML = html
    return tmp.textContent || tmp.innerText || ''
  }

  /**
   * 논쟁 상태에 따른 배지 정보 반환
   * 
   * @param {string} status - 논쟁 상태 (SCHEDULED, ACTIVE, ENDED)
   * @returns {Object} 배지 텍스트와 CSS 클래스
   */
  const getStatusBadge = (status) => {
    const statusMap = {
      SCHEDULED: { text: '예정', class: 'status-scheduled' },
      ACTIVE: { text: '진행중', class: 'status-active' },
      ENDED: { text: '종료', class: 'status-ended' },
    }
    return statusMap[status] || statusMap.SCHEDULED
  }

  /**
   * 작성자 프로필로 이동하는 핸들러
   * 카드 클릭 이벤트를 막고 작성자 프로필로만 이동
   */
  const handleAuthorClick = (e) => {
    e.preventDefault()
    e.stopPropagation()
    navigate(`/users/${argu.userId}`)
  }

  // 논쟁 상태 배지 정보 가져오기
  const status = getStatusBadge(argu.status)
  
  // HTML 태그 제거 후 텍스트만 추출
  const plainText = stripHtml(argu.content || '')

  return (
    <Link to={`/argu/${argu.id}`} className="argu-card-link">
      <div className="argu-card">
        {/* 카드 헤더: 카테고리 및 상태 배지 */}
        <div className="argu-card-header">
          {/* 카테고리 배지 (카테고리가 있는 경우만 표시) */}
          {argu.categoryName && (
            <span className="category-badge">{argu.categoryName}</span>
          )}
          {/* 상태 배지 */}
          <span className={`status-badge ${status.class}`}>{status.text}</span>
        </div>
        
        {/* 논쟁 제목 */}
        <h3 className="argu-title">
          {argu.title}
        </h3>
        
        {/* 논쟁 내용 미리보기 (150자까지만 표시, HTML 태그 제거) */}
        <p className="argu-excerpt">
          {plainText.substring(0, 150)}
          {plainText.length > 150 && '...'}
        </p>
        
        {/* 메타 정보: 작성자 및 작성일 */}
        <div className="argu-meta" onClick={(e) => e.stopPropagation()}>
          <span className="author">
            작성자:{' '}
            <span className="author-link" onClick={handleAuthorClick}>
              {argu.nickname || '알 수 없음'}
            </span>
          </span>
          <span className="date">
            {format(new Date(argu.createdAt), 'yyyy-MM-dd')}
          </span>
        </div>
        
        {/* 통계 정보: 좋아요, 댓글, 조회수 */}
        <div className="argu-stats">
          <span className="stat">👍 {argu.likeCount || 0}</span>
          <span className="stat">💬 {argu.commentCount || 0}</span>
          <span className="stat">👁️ {argu.viewCount || 0}</span>
        </div>
      </div>
    </Link>
  )
}

export default ArguCard








