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

import { Link } from 'react-router-dom'
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
 * @param {Object} props.argu.category - 카테고리 정보
 * @param {Object} props.argu.user - 작성자 정보
 * @param {number} props.argu.likeCount - 좋아요 수
 * @param {number} props.argu.commentCount - 댓글 수
 * @param {number} props.argu.viewCount - 조회수
 * @param {string} props.argu.createdAt - 생성일시
 * @returns {JSX.Element} 논쟁 카드 컴포넌트
 */
const ArguCard = ({ argu }) => {
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

  // 논쟁 상태 배지 정보 가져오기
  const status = getStatusBadge(argu.status)

  return (
    <div className="argu-card">
      {/* 카드 헤더: 카테고리 및 상태 배지 */}
      <div className="argu-card-header">
        {/* 카테고리 배지 (카테고리가 있는 경우만 표시) */}
        {argu.category && (
          <span className="category-badge">{argu.category.name}</span>
        )}
        {/* 상태 배지 */}
        <span className={`status-badge ${status.class}`}>{status.text}</span>
      </div>
      
      {/* 논쟁 제목 (클릭 시 상세 페이지로 이동) */}
      <h3 className="argu-title">
        <Link to={`/argu/${argu.id}`}>{argu.title}</Link>
      </h3>
      
      {/* 논쟁 내용 미리보기 (150자까지만 표시) */}
      <p className="argu-excerpt">
        {argu.content?.substring(0, 150)}
        {argu.content?.length > 150 && '...'}
      </p>
      
      {/* 메타 정보: 작성자 및 작성일 */}
      <div className="argu-meta">
        <span className="author">
          작성자: <Link to={`/users/${argu.user?.username}`}>{argu.user?.nickname || argu.user?.username}</Link>
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
  )
}

export default ArguCard








