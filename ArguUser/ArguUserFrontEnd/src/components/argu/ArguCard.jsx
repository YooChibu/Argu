import { Link } from 'react-router-dom'
import { format } from 'date-fns'
import './ArguCard.css'

const ArguCard = ({ argu }) => {
  const getStatusBadge = (status) => {
    const statusMap = {
      SCHEDULED: { text: '예정', class: 'status-scheduled' },
      ACTIVE: { text: '진행중', class: 'status-active' },
      ENDED: { text: '종료', class: 'status-ended' },
    }
    return statusMap[status] || statusMap.SCHEDULED
  }

  const status = getStatusBadge(argu.status)

  return (
    <div className="argu-card">
      <div className="argu-card-header">
        {argu.category && (
          <span className="category-badge">{argu.category.name}</span>
        )}
        <span className={`status-badge ${status.class}`}>{status.text}</span>
      </div>
      <h3 className="argu-title">
        <Link to={`/argu/${argu.id}`}>{argu.title}</Link>
      </h3>
      <p className="argu-excerpt">
        {argu.content?.substring(0, 150)}
        {argu.content?.length > 150 && '...'}
      </p>
      <div className="argu-meta">
        <span className="author">
          작성자: <Link to={`/users/${argu.user?.username}`}>{argu.user?.nickname || argu.user?.username}</Link>
        </span>
        <span className="date">
          {format(new Date(argu.createdAt), 'yyyy-MM-dd')}
        </span>
      </div>
      <div className="argu-stats">
        <span className="stat">👍 {argu.likeCount || 0}</span>
        <span className="stat">💬 {argu.commentCount || 0}</span>
        <span className="stat">👁️ {argu.viewCount || 0}</span>
      </div>
    </div>
  )
}

export default ArguCard








